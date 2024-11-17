"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import hero from "../../public/birth.jpg";
import { createMessage } from "../axios/functions";
import { useAlert } from "next-alert";
import { Alerts } from "next-alert";

const Register: React.FC = () => {
  const router = useRouter();

  const { addAlert } = useAlert();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("last name is required"),
    message: Yup.string()
      .min(10, "Message must be at least ten characters")
      .required("message is required")
  });

  return (
    <div
      className="relative min-h-screen px-3 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <motion.div
        className="bg-gray-800/50 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Please Leave a Message
        </h2>

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);
            try {
              const response = await createMessage(values);
              if (response?.status === 201) {
                addAlert(
                  "Message submitted successfully, God bless you!😊",
                  '',
                  "success"
                );
                return router.push("/");
              } else {
                addAlert("Error:", response?.data?.message, "error");
              }
            } catch (error: any) {
              if (error?.response) {
                addAlert("Error creating user:", error.response.data, "error");
              } else if (error?.request) {
                addAlert("No response received:", error.request, "error");
              } else {
                addAlert("Error setting up request:", error.message, "error");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <Field
                type="text"
                name="first_name"
                placeholder="First Name"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="first_name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="last_name"
                component="div"
                className="text-red-500 text-sm"
              />

              <Field
                type="email"
                name="email"
                placeholder="Email (Please use a valid email address)"
                className="border p-3 rounded w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
              <Field
                as="textarea"
                name="message"
                placeholder="Type your message here"
                rows="10"
                cols="50"
                className="border p-3 rounded w-full text-base h-40 resize-y"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500 text-sm"
              />

              <motion.button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit Message"
                )}
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
      <Alerts
        position="bottom-right"
        direction="left"
        timer={4000}
        className="rounded-md !w-80 z-[100]"
      ></Alerts>
    </div>
  );
};

export default Register;
