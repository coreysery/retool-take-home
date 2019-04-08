import React, { Component } from 'react';
import { Layout } from 'antd';
import './App.scss';
import { connect } from 'react-redux';
import ComponentEditor from './sideview/ComponentEditor';
import { IComponent, selectComponentsState, selectSelectedComponent } from './state/components';
import { AppState } from './state/types';
import ComponentPicker from './sideview/ComponentPicker';
import Editor from './Editor';

const { Header, Sider, Content } = Layout;

interface AppProps {
  selectedComponent?: IComponent;
}

class App extends Component<AppProps> {
  render() {
    const { selectedComponent } = this.props;
    return (
      <div className="App">

        <Layout>
          <Header className="App-Header">
            <h3>
              🦄 Retool 0.1
            </h3>
          </Header>
          <Layout>
            <Content>
              <Editor />
            </Content>

            <Sider width={300} theme="light" className="App-Right-Sider">
              {selectedComponent ? <ComponentEditor component={selectedComponent} /> : <ComponentPicker />}
            </Sider>
          </Layout>
        </Layout>

      </div>
    );
  }
}

export default connect(
    (state: AppState) => ({
      selectedComponent: selectSelectedComponent(state),
    })
)(App);
