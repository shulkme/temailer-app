'use client';
import {
  DatePicker as AntdDatePicker,
  Form as AntdForm,
  Input as AntdInput,
  Layout as AntdLayout,
  List as AntdList,
  Radio as AntdRadio,
  Skeleton as AntdSkeleton,
  Typography,
} from 'antd';

const {
  Sider: AntdSider,
  Content: AntdContent,
  Header: AntdHeader,
  Footer: AntdFooter,
} = AntdLayout;

const { Item: AntdFormItem } = AntdForm;

const { Password: AntdInputPassword, TextArea: AntdTextArea } = AntdInput;

const {
  Title: AntdTitle,
  Paragraph: AntdParagraph,
  Text: AntdText,
  Link: AntdLink,
} = Typography;

const { Item: AntdListItem } = AntdList;
const { Meta: AntdListMeta } = AntdListItem;

const { Group: AntdRadioGroup, Button: AntdRadioButton } = AntdRadio;

const { RangePicker: AntdDateRangePicker } = AntdDatePicker;

const { Button: AntdSkeletonButton, Input: AntdSkeletonInput } = AntdSkeleton;

export {
  AntdContent,
  AntdDatePicker,
  AntdDateRangePicker,
  AntdFooter,
  AntdForm,
  AntdFormItem,
  AntdHeader,
  AntdInput,
  AntdInputPassword,
  AntdLayout,
  AntdLink,
  AntdList,
  AntdListItem,
  AntdListMeta,
  AntdParagraph,
  AntdRadio,
  AntdRadioButton,
  AntdRadioGroup,
  AntdSider,
  AntdSkeleton,
  AntdSkeletonButton,
  AntdSkeletonInput,
  AntdText,
  AntdTextArea,
  AntdTitle,
};
