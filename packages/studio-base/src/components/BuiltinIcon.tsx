// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import ICONS from "@foxglove/studio-base/theme/icons";

type BuiltinIconProps = {
  name: keyof typeof ICONS;
};

function BuiltinIcon(props: BuiltinIconProps): JSX.Element {
  return ICONS[props.name];
}

export { BuiltinIcon };
