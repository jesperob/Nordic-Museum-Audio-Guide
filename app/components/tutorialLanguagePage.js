import React, { PropTypes, Component } from 'react';

import { View, StyleSheet, ScrollView, Settings } from 'react-native';

import I18n from 'react-native-i18n';

import NavigationBar from './navigationBar';
import TutorialWelcomePage from './tutorialWelcomePage';
import LanguageSwitcherButtons from './buttons/languageSwitcherButtons';

import { NAV_BAR_TEXT, NAV_BAR_BACKGROUND, OFF_BLACK } from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 44,
  },
});

class TutorialLanguagePage extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      switchLocale: PropTypes.func.isRequired,
      hideTutorial: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.advanceLanguageTutorialScreen = this.advanceLanguageTutorialScreen.bind(this);
  }

  componentDidMount() {
    if (Settings.get('advanceLanguageTutorialScreenOnLoad')) {
      setTimeout(this.advanceLanguageTutorialScreen, 1000);
      Settings.set({ advanceLanguageTutorialScreenOnLoad: false });
    }
  }

  advanceLanguageTutorialScreen() {
    const { hideTutorial } = this.props.actions;

    this.props.navigator.push({
      title: '',
      component: TutorialWelcomePage,
      barTintColor: '#ffffff',
      titleTextColor: NAV_BAR_TEXT,
      shadowHidden: true,
      navigationBarHidden: true,
      passProps: {
        navigator: this.props.navigator,
        locale: this.props.locale,
        actions: {
          hideTutorial,
        },
      },
    });
  }

  render() {
    const { locale } = this.props;

    const { switchLocale, hideTutorial } = this.props.actions;

    return (
      <View
        style={{ flex: 1 }}
        pointerEvents={Settings.get('advanceLanguageTutorialScreenOnLoad') ? 'none' : 'auto'}
      >
        <NavigationBar
          label={I18n.t('settingsScreen_Title')}
          labelStyle={{
            color: NAV_BAR_TEXT,
          }}
          barStyle={{
            backgroundColor: NAV_BAR_BACKGROUND,
            height: 44,
            top: 0,
          }}
        />
        <ScrollView
          style={styles.container}
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{ marginHorizontal: 25 }}
        >
          <LanguageSwitcherButtons
            textStyle={{ color: OFF_BLACK }}
            locale={locale}
            onPress={languageCode => {
              switchLocale(languageCode, 'tutorial');
              this.props.navigator.push({
                title: '',
                component: TutorialWelcomePage,
                barTintColor: '#ffffff',
                titleTextColor: OFF_BLACK,
                shadowHidden: true,
                navigationBarHidden: true,
                passProps: {
                  navigator: this.props.navigator,
                  locale: languageCode,
                  actions: {
                    hideTutorial,
                  },
                },
              });
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default TutorialLanguagePage;
