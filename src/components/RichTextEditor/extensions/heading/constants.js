export const customHeadingNodeName = 'headingCustom';
export const customHeadingNodeClass = `node-${customHeadingNodeName}`;

/** Параметры кастомного html-тега для заголовков */
export const hMeta = {
  /** имя тега в DOM */
  tag: 'h-metachm',
  /** имя ноды в рамках ProseMirror */
  nodeName: 'hMetaChmN', // h-meta-chm-node-name
  /** имя группы, к которой будет принадлежать нода (для ProseMirror) */
  group: 'hmetachmG', // h-meta-chm-group
};

class HeadingSpecialEl extends HTMLElement {}
customElements.define(hMeta.tag, HeadingSpecialEl);
