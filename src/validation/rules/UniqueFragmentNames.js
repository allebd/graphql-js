/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import { duplicateFragmentNameMessage } from '../errors';
import { GraphQLError } from '../../error';


/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 */
export default function UniqueFragmentNames(): any {
  var knownFragmentNames = Object.create(null);
  return {
    FragmentDefinition(node) {
      var fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        return new GraphQLError(
          duplicateFragmentNameMessage(fragmentName),
          [knownFragmentNames[fragmentName], node.name]
        );
      }
      knownFragmentNames[fragmentName] = node.name;
    }
  };
}
