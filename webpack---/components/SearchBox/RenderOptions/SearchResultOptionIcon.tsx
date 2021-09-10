import * as React from 'react';
import { DataType } from '../../../types';
import { IResultEntry } from '../Entries';
import { ContactAvatar } from '@wix/contact-utils';
import * as Icons from 'wix-ui-icons-common';
import Article from 'wix-ui-icons-common/Article';
import Document from 'wix-ui-icons-common/Document';
import { Avatar } from 'wix-style-react';

const iconStyle = {
  display: 'block',
  margin: 'auto',
  color: '#2b81cb'
};

const helpIconStyle = {
  ...iconStyle,
  color: '#3899ec'
};

const iconSize = 24;

const CircledIcon = Icon =>
  Icon ?
  <Avatar size="size36" placeholder={<Icon size={iconSize} style={iconStyle} />} /> :
  <Avatar size="size36" placeholder={<Document size={iconSize} style={iconStyle} />} />;

const getOptionAvatar = (type: DataType, avatar, text, payload) =>
  type === DataType.Contacts ?
  <ContactAvatar initials={payload && payload.initials || text} pictureUrl={avatar} size={36} /> :
  <Avatar imgProps={{ src: avatar }} name={text} size="size36" />;

const getOptionIcon = (type: DataType, avatar, icon, text, payload) =>
  avatar ? getOptionAvatar(type, avatar, text, payload) : CircledIcon(Icons[icon]);

const getIconFromType = ({ type, entryType, avatar, icon, displayTitle, payload }: IResultEntry) =>
  type === DataType.Answers ? <Article style={helpIconStyle} size={24} /> :
  (avatar || icon) && getOptionIcon(type, avatar, icon, displayTitle, payload) || null;

export class SearchResultOptionIcon extends React.PureComponent<IResultEntry> {
  render () {
    return getIconFromType(this.props);
  }
}
