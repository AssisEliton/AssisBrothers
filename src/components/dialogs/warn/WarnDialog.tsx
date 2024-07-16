import React from 'react';
import { Modal } from 'antd';

export const successModal = (msg: string) => {
    Modal.success({
        content: msg,
    });
};

export const errorModal = (msg: string) => {
    Modal.error({
        title: 'Erro!',
        content: msg,
    });
};

export const warningModal = (msg: string) => {
    Modal.warning({
        title: 'Aviso!',
        content: msg,
    });
};


