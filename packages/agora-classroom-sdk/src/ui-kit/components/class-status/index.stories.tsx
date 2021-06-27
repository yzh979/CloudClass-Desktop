import React, { useState } from 'react'
import { Meta } from '@storybook/react';
import { PreClass, EndClass } from './index'

const meta: Meta = {
    title: 'Components/ClassStatus',
    component: PreClass,
}


export const Docs = () => {
    return (
        <PreClass/>
    )
}


Docs.args = {
}

export const SmallDocs = () => {
    return (
        <EndClass/>
    )
}


SmallDocs.args = {
}

export default meta;