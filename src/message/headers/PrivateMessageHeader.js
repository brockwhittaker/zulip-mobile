import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { Touchable } from '../../common';
import { privateNarrow, groupNarrow } from '../../utils/narrow';
import { IconPrivateChat } from '../../common/Icons';

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#333',
    alignItems: 'center',
  },
  private: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    color: 'white',
  },
  icon: {
    paddingLeft: 8,
  },
});

export default class PrivateMessageHeader extends React.PureComponent {

  props: {
    itemId: number,
    recipients: string,
    doNarrow: () => {},
  }

  performNarrow = () => {
    const { itemId, recipients, doNarrow } = this.props;
    const narrow = recipients.length === 1 ?
      privateNarrow(recipients[0].email) :
      groupNarrow(recipients.map(r => r.email));
    doNarrow(narrow, itemId);
  }

  render() {
    const { recipients, customStyle } = this.props;
    const others = recipients.map(r => r.full_name).sort().join(', ');

    return (
      <View style={[styles.container, customStyle]}>
        <Touchable onPress={this.performNarrow}>
          <View style={styles.header}>
            <IconPrivateChat color="white" size={16} style={styles.icon} />
            <Text style={styles.private}>
              {others}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}
