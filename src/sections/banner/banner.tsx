import { useState } from "react";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Alert, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import { gql, useQuery } from "@apollo/client";

import { DefaultModal } from "../../components/modals/DefaultModal";
import "./banner.css";
import EmptyContent from "../../components/EmptyContent";
import { axiosInstance } from "../../utils/axios";
import { Supplier } from "../../@types/localEntity";

function Banner() {
  const [openModal, setOpenModal] = useState(false);
  const [isGetSuplliers, setIsGetSuplliers] = useState(false);
  const [suplliers, setsuplliers] = useState<Supplier[] | []>([]);

  //const { loading, error, data } = useQuery(GET_SUPPLIERS);

  type FormValuesProps = {
    consumption: number | null;
    afterSubmit?: string;
  };

  const supplierSchema = Yup.object().shape({
    consumption: Yup.number().required(
      "informe seu consumo mensal de energia(kWh)"
    ),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues: {
      consumption: null,
    },
    validationSchema: supplierSchema,
    onSubmit: async (values: FormValuesProps, { resetForm, setErrors }) => {
      try {
        const suplliers = await axiosInstance.get(
          `/suppliers?consumption=${values.consumption}`
        );
        setIsGetSuplliers(true);
        setsuplliers(suplliers.data);
      } catch (error: any) {
        console.error(error);

        resetForm();

        setErrors({ afterSubmit: error.message });
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  function handleCloseModal() {
    setOpenModal((state) => !state);
  }

  return (
    <div className="clk-banner">
      <div className="clk-container flex">
        <div className=" flex-1 flex flex-col justify-between items-center">
          <div
            className="w-full
        "
          >
            <img src="/clk-logo.png" alt="clk" width={100} height={100} />
          </div>
          {/* <Image src="/clk-logo.png" alt="clk" width={100} height={100} /> */}

          <div className="w-full">
            <h1 className="text-5xl font-bold mb-2">
              Escolha Inteligente de Fornecedores de Energia
            </h1>
          </div>

          <div className="w-full mb-20">
            <p className="text-lg text-black">
              Compartilhe conosco seu consumo mensal de energia, e faremos a
              seleção dos fornecedores ideais para atender suas demandas de
              forma eficiente.
            </p>
            <button
              type="button"
              className="text-white-500 
            w-full
            hover:text-black 
            border border-white-400 
            hover:bg-yellow-500 focus:ring-4 focus:outline-none 
            focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 
            text-center me-2 mb-2"
              onClick={() => setOpenModal(true)}
            >
              Escolher fornecedor de energia
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img src="/clk.png" alt="clk" width={500} height={500} />
        </div>

        <DefaultModal
          style={{ paddingBottom: "20px" }}
          title="Otimize sua escolha com seu consumo mensal de energia(kWh)"
          open={openModal}
          handleClose={handleCloseModal}
        >
          {" "}
          <FormikProvider value={formik}>
            <Form noValidate onSubmit={handleSubmit}>
              <div className="flex p-4">
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit}</Alert>
                )}

                <TextField
                  fullWidth
                  label="Consumo mensal de energia(kWh)"
                  type="number"
                  {...getFieldProps("consumption")}
                  error={Boolean(touched.consumption && errors.consumption)}
                  helperText={touched.consumption && errors.consumption}
                />

                <LoadingButton
                  className="p-1"
                  sx={{ height: "56px" }}
                  size="small"
                  variant="contained"
                  type="submit"
                  loading={isSubmitting}
                >
                  Pesquisar
                </LoadingButton>
              </div>
            </Form>
          </FormikProvider>
          {!isGetSuplliers && <EmptyContent title="" />}
          {isGetSuplliers && suplliers.length === 0 && (
            <EmptyContent title="Infelizmente, não encontramos fornecedores que atendam às suas necessidades no momento!" />
          )}
          {suplliers.map((i) => (
            <div
              key={i.id}
              className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg flex flex-col sm:flex-row mb-4"
            >
              <img
                className="w-full sm:w-1/3 h-32 object-cover"
                src="/clk.png"
                alt="Logo da Empresa"
              />

              <div className="w-full sm:w-2/3 pl-4 pt-4 sm:pt-0">
                <h2 className="text-xl font-semibold mb-1">{i.name}</h2>

                <p className="text-gray-600">Estado: {i.state}</p>
                <p className="text-gray-600">Custo por kWh: R$ {i.kwh_cost}</p>
                <p className="text-gray-600">
                  Limite Mínimo de kWh: {i.min_kwh_limit}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <p className="text-gray-600 mb-2 sm:mb-0">
                    Total de Clientes: {i.total_customers}
                  </p>

                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      4.95
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DefaultModal>
      </div>
    </div>
  );
}

export default Banner;
