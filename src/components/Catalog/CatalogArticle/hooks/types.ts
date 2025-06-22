/* eslint-disable import/named */
import {
  TRteOnInputProp,
  TRteOnRealCreateProp,
} from 'components/RichTextEditor/types';

export interface IUseArtNavigatorProps {
  editorContainerRef: React.RefObject<HTMLDivElement>;
}

export interface IUseArtNavigatorReturnType {
  navigatorFlag: boolean;
  headerElRef: React.RefObject<HTMLElement>;
  handleEditorUpdate: TRteOnInputProp;
  handleEditorCreation: TRteOnRealCreateProp;
}

export type TUseArtNavigator = (
  props: IUseArtNavigatorProps
) => IUseArtNavigatorReturnType;
