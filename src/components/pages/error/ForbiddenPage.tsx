import React from 'react';
import { Result, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const ForbiddenPage = () => {
  const handleBackHome = () => {
    // Redirecionar para a página inicial
    window.location.href = '/home';
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
      <Result
        icon={<LockOutlined style={{ fontSize: '72px', color: '#ff4d4f' }} />}
        status="403"
        title="403 - Acesso Negado"
        subTitle="Desculpe, você não tem permissão para acessar esta página."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Voltar para a Home
          </Button>
        }
      />
    </div>
  );
};

export default ForbiddenPage;
