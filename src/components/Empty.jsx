import React from 'react';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
export const Empty = ({ loading, uploadPdf }) => (
  <Segment
    data-testid="empty-container"
    placeholder
    loading={loading}
    style={{ height: '80vh' }}
  >
    <Header icon>
      <Icon name="file pdf outline" />
      Upload your PDF to start editing!
    </Header>
    <Button
      primary
      data-testid="empty-screen-upload-pdf-btn"
      onClick={uploadPdf}
    >
      Load PDF
    </Button>
  </Segment>
);
