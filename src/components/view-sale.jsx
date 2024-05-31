import {
  Box,
  Button,
  Kbd,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import EditSaleOrderForm from "./edit-sale-order-form";

const ViewSale = ({ saleData }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
      <Button
        size={"sm"}
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        <LuEye />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList>
              <ListItem>User Id: {saleData?._id}</ListItem>
              <ListItem>Name: {saleData?.username}</ListItem>
              <ListItem>
                Products:{" "}
                {saleData?.products.map((product) => (
                  <Kbd key={product.label}>{product.value}</Kbd>
                ))}
              </ListItem>
              <ListItem>Total Price: {saleData?.total_price}</ListItem>
              <ListItem>Paid: {saleData?.paid}</ListItem>
              <ListItem>Invoice Number: {saleData?.invoice_no}</ListItem>
              <ListItem>
                Last Updated: {saleData?.last_updated.split("T")[0]}
              </ListItem>
              <ListItem>
                Invoice Date: {saleData?.invoice_date.split("T")[0]}
              </ListItem>
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewSale;
