import React, {Component} from 'react';
import { Platform, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import GoalList from './components/GoalList';
import GoalCreate from './components/GoalCreate';
import GoalEdit from './components/GoalEdit';
import GoalView from './components/GoalView';
import CategoryCreate from './components/CategoryCreate';
import CategoryEdit from './components/CategoryEdit';
import Settings from './components/Settings';
import Drawer from 'react-native-drawer';
import SideMenu from './components/SideMenu';
import { MKButton, MKColor } from 'react-native-material-kit';
import EStyleSheet from 'react-native-extended-stylesheet';
import layout from './styles/layout';

class RouterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  render() {

    return (
      <Drawer
       type="displace"
       content={
        <SideMenu
         onClosePress={ () => this.drawer.close()
        }/>
      }
       openDrawerOffset={100}
       tweenHandler={Drawer.tweenPresets.parallax}
       tapToClose={true}
       ref={ (ref) => this.drawer = ref}
          openDrawerOffset={0.2}
          panCloseMask={0.2}
          negotiatePan={true}
       >
        <Router sceneStyle={styles.navStyle}>
          <Scene key="auth">
            <Scene
              key="login"
              component={LoginForm}
              title="Please Login"
              navigationBarStyle={layout.goalViewNav}
              initial
            />
          </Scene>
          <Scene key="main">
            <Scene
              key="goalList"
              component={GoalList}
              title=""
              rightTitle="Add"
              onRight={() => Actions.goalCreate()}
              showMenu={this.state.showMenu}
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="goalCreate"
              component={GoalCreate}
              title="Create Goal"
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="goalEdit"
              component={GoalEdit}
              title="Edit Goal"
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="goalView"
              component={GoalView}
              title=""
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="categoryCreate"
              component={CategoryCreate}
              title="Create Category"
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="categoryEdit"
              component={CategoryEdit}
              title="Edit Category"
              navigationBarStyle={layout.goalViewNav}
            />
            <Scene
              key="settings"
              component={Settings}
              title="Settings"
              navigationBarStyle={layout.goalViewNav}
            />
          </Scene>
        </Router>
      </Drawer>
    )
  }

};

const styles = EStyleSheet.create({
  navStyle: {

  },
});

export default RouterComponent;
