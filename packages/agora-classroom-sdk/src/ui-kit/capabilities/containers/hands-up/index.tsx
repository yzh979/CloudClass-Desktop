import { EduRoleTypeEnum} from 'agora-rte-sdk';
import { useHandsUpContext, useRoomContext } from 'agora-edu-core'
import { observer } from 'mobx-react';
import { HandsUpManager, HandsUpSender, StudentInfo, transI18n } from '~ui-kit';
import { useUIStore } from '@/infra/hooks';

export const HandsUpManagerContainer = observer(() => {

    const {
        waveArmStudentList,
        teacherAcceptHandsUp,
        teacherRejectHandsUp,
    } = useHandsUpContext()

    const handleUpdateList = async (type: string, info: StudentInfo) => {
        switch (type) {
            case 'confirm': {
                await teacherAcceptHandsUp(info.userUuid)
                break;
            }
            case 'cancel': {
                await teacherRejectHandsUp(info.userUuid)
                break;
            }
        }
    }

    return (
        <HandsUpManager
            onClick={handleUpdateList}
            studentList={waveArmStudentList}
        />
    )
})


export const HandsUpReceiverContainer = observer(() => {

    const {
        addToast
    } = useUIStore()

    const {
        teacherUuid,
        studentHandsUping
    } = useHandsUpContext()

    const handsUpDuration = async (duration: 3 | -1) => {
        await studentHandsUping(teacherUuid, duration);
    }

    return (
        <HandsUpSender handsUpDuration={handsUpDuration}/>
    )
})

export const HandsUpContainer = observer(() => {

    const getHandsType = (role: EduRoleTypeEnum) => {
        const defaultType = null  
        const map = {
            [EduRoleTypeEnum.teacher]: 'manager',
            [EduRoleTypeEnum.student]: 'receiver',
        }
        return map[role] || defaultType
    }

    const {roomInfo} = useRoomContext()

    const handsType = getHandsType(roomInfo.userRole)

    const switchMap = {
        'manager': <HandsUpManagerContainer />,
        'receiver': <HandsUpReceiverContainer />
    }
    return switchMap[handsType] || null
})