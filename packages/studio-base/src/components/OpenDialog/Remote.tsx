// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import { Typography, TextField } from "@mui/material";
import { useCallback, useState, useMemo } from "react";

import Stack from "@foxglove/studio-base/components/Stack";
import {
  IDataSourceFactory,
  usePlayerSelection,
} from "@foxglove/studio-base/context/PlayerSelectionContext";

import View from "./View";

type RemoteProps = {
  onBack?: () => void;
  onCancel?: () => void;
  availableSources: IDataSourceFactory[];
};

export default function Remote(props: RemoteProps): JSX.Element {
  const { onCancel, onBack, availableSources } = props;

  const { selectSource } = usePlayerSelection();
  const [currentUrl, setCurrentUrl] = useState<string | undefined>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const onOpen = useCallback(() => {
    if (!currentUrl) {
      return;
    }

    // find remote supporting this extension
    const foundSource = availableSources.find((source) => {
      return source.type === "remote-file";
    });

    if (!foundSource) {
      setErrorMessage(`No remote data sources available for files`);
      return;
    }

    selectSource(foundSource.id, {
      type: "connection",
      params: {
        url: currentUrl,
      },
    });
  }, [availableSources, currentUrl, selectSource]);

  const supportedExtensions = useMemo(
    () =>
      new Intl.ListFormat("en-US", { style: "long" }).format(
        availableSources
          .filter((source) => source.type === "remote-file")
          .flatMap((source) => source.supportedFileTypes ?? []),
      ),
    [availableSources],
  );

  return (
    <View onBack={onBack} onCancel={onCancel} onOpen={onOpen}>
      <Stack gap={2}>
        <TextField
          label="Remote file URL"
          error={errorMessage != undefined}
          helperText={errorMessage}
          placeholder="https://example.com/file.bag"
          onChange={(event) => setCurrentUrl(event.target.value)}
        />
        <Typography color="text.secondary">
          {`${supportedExtensions} files are supported.`}
        </Typography>
      </Stack>
    </View>
  );
}
