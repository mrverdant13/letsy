import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, ImageList, ImageListItem, Stack, Tooltip, Typography } from "@mui/material";

import { IPayment } from "../../interfaces/payment";
import { AddPhotoAlternate } from "@mui/icons-material";
import httpClient from "../../apis/_client";
import { useEquivalenceGroupContext } from '../../context/equivalence-group/context';
import { IPaymentImageSignatureData } from '../../interfaces/payment-image-signature-data';

interface Props {
  isOpen: boolean;
  close: () => void;
  payment: IPayment;
}

type WindowType =
  & Window
  & typeof globalThis
  & {
    cloudinary: any;
  }
  ;

export const PaymentImagesDialog: FC<Props> = (props) => {
  const { group, updatePayment } = useEquivalenceGroupContext();
  const { isOpen, close, payment } = props;
  const [isBootstrappingUploadWidget, setIsBootstrappingUploadWidget] = useState(false);
  const [uploadedImgUrl, setUploadedImgUrl] = useState<string | undefined>(undefined);
  const [uploadWidget, setUploadWidget] = useState<any>(null);
  const images = payment.images;

  useEffect(
    () => {
      if (uploadedImgUrl == undefined) return;
      if (payment.images.includes(uploadedImgUrl)) return;
      const resultingPayment = {
        ...payment,
        images: [
          ...payment.images,
          uploadedImgUrl,
        ],
      };
      updatePayment(payment.name, resultingPayment);
    },
    [payment, uploadedImgUrl, updatePayment],
  );

  useEffect(() => {
    if (!isOpen) return;
    if (isBootstrappingUploadWidget) return;
    const bootstrapUploadWidget = async () => {
      try {
        if (uploadWidget != undefined) return;
        setIsBootstrappingUploadWidget(true);
        const response = await httpClient.post<IPaymentImageSignatureData>(`equivalent-value/groups/${group._id}/sign-img-upload`);
        const data = response.data;
        const options = {
          uploadSignature: data.signature,
          uploadSignatureTimestamp: data.timestamp,
          cloudName: data.cloudName,
          apiKey: data.apiKey,
          folder: data.folder,
          cropping: false,
        }

        const processResults = (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            const imgUrl = result.info.secure_url;
            setUploadedImgUrl(imgUrl);
          }
        }
        const widget = (window as WindowType).cloudinary.createUploadWidget(
          options,
          processResults,
        );
        setUploadWidget(widget);
      } catch (e) {
        console.error(e);
      } finally {
        setIsBootstrappingUploadWidget(false);
      }
    }
    if (uploadWidget == undefined) bootstrapUploadWidget();
  },
    [isOpen, isBootstrappingUploadWidget, uploadWidget, group._id],
  );

  const openWidget = () => {
    uploadWidget?.open();
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
    >
      <DialogTitle  >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          Payment images
          {
            !(isBootstrappingUploadWidget || uploadWidget == undefined) &&
            <Tooltip title="Add images">
              <IconButton
                onClick={openWidget}
              >
                <AddPhotoAlternate />
              </IconButton>
            </Tooltip>
          }
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {
          (images.length > 0)
            ?
            <ImageList variant="masonry" cols={3} gap={8}>
              {payment.images.map((img) => (
                <ImageListItem key={img}>
                  <Image
                    key={img}
                    layout="intrinsic"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    src={img}
                    alt={payment.name}
                    title={payment.name}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            :
            <Typography
              variant="h5"
              sx={{
                width: 500,
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              No images
            </Typography>
        }
      </DialogContent>
    </Dialog>
  );
}
