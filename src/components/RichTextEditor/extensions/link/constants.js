// @ts-check
/**
 * Protocols supported by the
 * [linkifyjs](https://www.npmjs.com/package/linkifyjs) library out of the box.
 *
 * @typedef {'http'
 *   | 'https'
 *   | 'ftp'
 *   | 'ftps'
 *   | 'mailto'
 *   | 'tel'
 *   | 'callto'
 *   | 'sms'
 *   | 'cid'
 *   | 'xmpp'} TRteDefProtocols
 */

/** @typedef {{ [key in TRteDefProtocols]: boolean }} TProtocolsRight */

/**
 * Default protocol for links, in RichTextEditor.
 *
 * @type {TRteDefProtocols}
 */
export const RTE_DEF_LINK_PROTO = 'https';

/**
 * Allowed and prohibited protocols.
 *
 * These are only protocols supported by the
 * [linkifyjs](https://www.npmjs.com/package/linkifyjs)\
 * library out of the box. Other protocols must be\
 * specified in the link extension config and used plugins.
 *
 * @type {TProtocolsRight}
 */
export const PROTOCOLS_RIGHTS = {
  http: true,
  https: true,
  ftp: false,
  ftps: false,
  /**
   * Запрещённость данного протокола предотвращает авто-создание ссылки,\
   * только когда явно пишут "mailto:". Если просто написать имя почты,\
   * то будет создана ссылка. Для полной остановки авто-ссылок,\
   * необходимо кастомизировать shouldAutolink в конфиге расширения "ссылки".
   */
  mailto: true,
  tel: true,
  callto: false,
  sms: false,
  cid: false,
  xmpp: false,
};

const PROTOCOLS = /** @type {TRteDefProtocols[]} */ (
  Object.keys(PROTOCOLS_RIGHTS)
);

/** @type {TRteDefProtocols[]} */
export const disallowedProtocols = [];
/** @type {TRteDefProtocols[]} */
export const allowedProtocols = [];

PROTOCOLS.forEach((p) => {
  if (PROTOCOLS_RIGHTS[p]) {
    allowedProtocols.push(p);
  } else {
    disallowedProtocols.push(p);
  }
});

export const disallowedDomains = [
  'www.afk.com', // just for example
];
