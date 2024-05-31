import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Select } from "chakra-react-select";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "username should be at least 2 charactors" }),
  products: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .min(1, { message: "Please select at least one product" }),
  invoice_no: z.preprocess((arg) => {
    if (typeof arg === "string") return Number(arg.trim());
  }, z.number({ required_error: "Invoice number is required" }).min(1, { message: "Invoice number cannot be empty" })),
  invoice_date: z.preprocess(
    (arg) => {
      if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    },
    z
      .date({ required_error: "Invoice date is required" })
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date format",
      })
  ),
  total_price: z.preprocess((arg) => {
    if (typeof arg === "string") return Number(arg.trim());
  }, z.number({ required_error: "Price is required" }).min(1, { message: "Price cannot be empty" })),
  paid: z.boolean().optional().default(false),
});

const productOptions = [
  {
    label: "product1",
    value: "product 1",
  },
  {
    label: "product2",
    value: "product 2",
  },
  {
    label: "product3",
    value: "product 3",
  },
  {
    label: "product4",
    value: "product 4",
  },
  {
    label: "product5",
    value: "product 5",
  },
];

const SaleOrderForm = ({ closeModal }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      products: [],
      invoice_no: null,
      invoice_date: Date.now(),
      total_price: 0,
      paid: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (values) =>
      axios.post("http://localhost:5001/api/sales", values),
    onError: (error) => {
      console.log("mutation error", error);
    },
    onSuccess: (data) => {
      // Store the data in the cache using queryClient
      console.log("query data", data?.data);
      queryClient.setQueryData(["sale"], data?.data);
      reset();
      closeModal();
      navigate("/active-sales", { replace: true });
    },
  });

  const onSubmit = (values) => {
    mutation.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="products"
        rules={{ required: "Please select at least one product." }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { error },
        }) => (
          <FormControl py={4} isInvalid={!!error} id="products">
            <FormLabel>All Products</FormLabel>

            <Select
              isMulti
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              options={productOptions}
              placeholder="Select products"
              closeMenuOnSelect={false}
            />

            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        )}
      />

      <FormControl isInvalid={errors.username}>
        <FormLabel htmlFor="username">Your Name</FormLabel>
        <Input
          id="username"
          placeholder="your name"
          {...register("username")}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.invoice_no}>
        <FormLabel htmlFor="invoice_no">Invoice Number</FormLabel>
        <Input
          id="invoice_no"
          type="number"
          placeholder="invoice number"
          {...register("invoice_no")}
        />
        <FormErrorMessage>
          {errors.invoice_no && errors.invoice_no.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.invoice_date}>
        <FormLabel htmlFor="invoice_date">Invoice Date</FormLabel>
        <Input
          id="invoice_date"
          type="date"
          placeholder="invoice date"
          {...register("invoice_date")}
        />
        <FormErrorMessage>
          {errors.invoice_date && errors.invoice_date.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.total_price}>
        <FormLabel htmlFor="total_price">Total Price</FormLabel>
        <Input
          id="total_price"
          type="number"
          placeholder="total price"
          {...register("total_price")}
        />
        <FormErrorMessage>
          {errors.total_price && errors.total_price.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="paid">Paid</FormLabel>
        <Controller
          name="paid"
          control={control}
          render={({ field }) => (
            <Checkbox id="paid" {...field} isChecked={field.value}>
              Paid
            </Checkbox>
          )}
        />
      </FormControl>

      <Button
        mt={4}
        colorScheme="teal"
        isLoading={isSubmitting}
        type="submit"
        w={"full"}
      >
        Submit
      </Button>
    </form>
  );
};

export default SaleOrderForm;
