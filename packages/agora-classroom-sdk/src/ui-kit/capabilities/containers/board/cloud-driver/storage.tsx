import { useBoardContext } from 'agora-edu-core';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { Col, IconBox, Inline, Placeholder, Row, Table, TableHeader, transI18n } from '~ui-kit';

import IconImg from './assets/img.png'
import IconPpt from './assets/ppt.png'
import IconWord from './assets/word.png'


export const StorageContainer = observer(() => {

  const {publicResources, openCloudResource} = useBoardContext()

  return (
    <Table className="public-resource">
    <TableHeader>
      <Col>{transI18n('cloud.fileName')}</Col>
      <Col>{transI18n('cloud.size')}</Col>
      <Col>{transI18n('cloud.updated_at')}</Col>
    </TableHeader>
    <Table className="table-container" style={{flex:1,minHeight:0}}>
      {publicResources.length ? publicResources.map(({ id, name, date, updateTime, size, type }: any, idx: number) =>
        <Row height={10} border={1} key={idx} >
          <Col style={{cursor: 'pointer', paddingLeft: 19}} onClick={async () => {
            await openCloudResource(id)
          }}>
            { 
              ['image', 'pdf', 'word'].indexOf(type) !== -1?
                <img className="fileIcon" src={type == 'image' ? IconImg:(type=='pdf'?IconPpt:IconWord)}/>
              :
              <IconBox iconType={type} style={{ width: '19px'}} />
            }
            <Inline className="filename" color="#191919">{name}</Inline>
          </Col>
          <Col>
            <Inline color="#586376">{size}</Inline>
          </Col>
          <Col>
            <Inline color="#586376">{dayjs(updateTime).format("YYYY-MM-DD HH:mm:ss")}</Inline>
          </Col>
        </Row>
      ) : <Placeholder placeholderType="noFile"/>}
    </Table>
  </Table>
  )
})