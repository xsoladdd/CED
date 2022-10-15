import { Story } from '@storybook/react';
import AvatarComponent from '.';
import { avatarArgsTypes } from './helper';
import { IDiceBearAvatarProps } from './types';

export default {
  title: `Common Component/DiceBearAvatar`,
  component: AvatarComponent,
};

const Template: Story<IDiceBearAvatarProps> = (args) => (
  <AvatarComponent optimize={false} {...args} />
);

export const DiceBearAvatar = Template.bind({});
DiceBearAvatar.args = {
  id: '20140023',
};

DiceBearAvatar.argTypes = avatarArgsTypes;
