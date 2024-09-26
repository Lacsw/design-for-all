// import objectIncludes from '@tiptap/core/src/utilities/objectIncludes';
import { getNodeType, objectIncludes } from '@tiptap/react';

/**
 * @typedef {object} LastActiveNodesItemOption
 * @property {string} type
 * @property {string} attributes - The user's last name.
 * @property {string} key - The user's age.
 */

export function lastActiveNodes(state, typesOrGroup) {
  const { from, to, empty } = state.selection;
  let types;

  if (typeof typesOrGroup === 'string') {
    // types is a name of a node group
    types = Object.entries(state.schema.nodes)
      .filter(([name, nodeType]) => nodeType.groups.includes(typesOrGroup))
      .map(([name, nodeType]) => {
        return {
          type: nodeType,
        };
      });
  } else {
    // types is a list of LastActiveNodeItemOption
    types = typesOrGroup;
    for (const item of types) {
      item.type = item.type ? getNodeType(item.type, state.schema) : null;
    }
  }

  let lastNode = null;
  let lastMatchedType = null;
  const matchedTypes = new Set();
  const notFoundTypes = new Set(types);

  state.doc.nodesBetween(from, to, (node, pos, parent) => {
    if (notFoundTypes.size == 0) return false;
    if (!node.isText) {
      const matchedType = types
        .filter((item) => {
          if (!item.type) {
            return true;
          }
          if (typeof item.type === 'string') return false; // Typeguard, shouldn't happen
          return node.type.name === item.type.name;
        })
        .find((item) => {
          if (!item.attributes) return true;
          return objectIncludes(node.attrs, item.attributes);
        });
      if (matchedType) {
        if (lastMatchedType && lastNode && lastNode !== parent) {
          notFoundTypes.delete(lastMatchedType);
          matchedTypes.add(lastMatchedType);
        }
        lastMatchedType = matchedType;
      }
      lastNode = node;
    }
  });

  if (lastMatchedType) {
    matchedTypes.add(lastMatchedType);
  }

  return [...matchedTypes.values()].map((item) => {
    if (item.key) {
      return item.key;
    } else if (typeof item.type === 'string') {
      return item.type;
    } else if (item.type?.name) {
      return item.type.name;
    } else {
      return '';
    }
  });
}
