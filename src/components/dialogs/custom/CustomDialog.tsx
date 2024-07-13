import { Button, Modal } from "antd";

export const customModal = (title: string, component: React.ReactNode) => {
    const celular = window.matchMedia("(max-width: 768px)").matches;

    const modalContentStyle: React.CSSProperties = {
        minHeight: celular ? '80vh' : '60vh',
        maxHeight: celular ? '80vh' : '60vh',
        width: '100%',
    };

    const modalFooter = celular ? (
        <div style={{ textAlign: 'right' }}>
            <Button className='mt-1' onClick={() => Modal.destroyAll()} type="primary">Fechar</Button>
        </div>
    ) : null;

    Modal.info({
        title: title,
        icon: null,
        content: (
            <div className='overflow-auto d-flex justify-content-center' style={modalContentStyle}>
                {component}
            </div>
        ),
        okButtonProps: { style: { display: 'none' } },
        cancelButtonProps: { style: { display: 'none' } },
        maskClosable: true,
        width: celular ? '100vw' : '60vw',
        footer: modalFooter,
    });
};