import * as React from 'react';
import { connect } from 'react-redux';

export interface IAppProps {}

class ProfilePage extends React.Component<IAppProps> {
  public render() {
    return <div></div>;
  }
}

const mapState2Props = (state: any) => {
  return {};
};

export default connect(mapState2Props)(ProfilePage);
