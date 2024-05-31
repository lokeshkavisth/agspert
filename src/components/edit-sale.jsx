import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import EditSaleOrderForm from "./edit-sale-order-form";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const EditSale = ({ saleData }) => {
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
        <HiOutlineDotsHorizontal />
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Edit Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditSaleOrderForm closeModal={onClose} saleData={saleData} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditSale;
