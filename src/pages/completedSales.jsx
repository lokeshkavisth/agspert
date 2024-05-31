import { useQuery } from "@tanstack/react-query";
import { fetchSales } from "../utils/fetchSales";
import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import EditSale from "../components/edit-sale";
import ViewSale from "../components/view-sale";

const CompletedSales = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["sales"],
    queryFn: fetchSales,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading sales data</div>;
  console.log(data);

  return (
    <Box>
      {data.data.length < 1 ? (
        <Box>No active sale orders found!</Box>
      ) : (
        <TableContainer>
          <Table variant={"striped"} colorScheme="teal">
            <TableCaption>Active Sales</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>User name</Th>
                <Th>Price</Th>
                <Th>Last Updated</Th>
                <Th>View</Th>
              </Tr>
            </Thead>

            <Tbody>
              {data.data?.map((sale, i) => {
                if (sale.paid === true) {
                  return (
                    <Tr key={sale._id}>
                      <Td>{i + 1}</Td>
                      <Td>{sale.username}</Td>
                      <Td>{sale.total_price} $</Td>
                      <Td>{sale.last_updated.split("T")[0]}</Td>
                      <Td>
                        <ViewSale saleData={sale} />
                      </Td>
                    </Tr>
                  );
                }
              })}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CompletedSales;
