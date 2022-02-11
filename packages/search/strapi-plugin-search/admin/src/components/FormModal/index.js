import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Flex } from '@strapi/design-system/Flex';
import { Form, GenericInput } from '@strapi/helper-plugin';
import { Button } from '@strapi/design-system/Button';
import { Divider } from '@strapi/design-system/Divider';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Loader } from '@strapi/design-system/Loader';
import { ModalLayout, ModalFooter, ModalBody, ModalHeader } from '@strapi/design-system/ModalLayout';
import { Typography } from '@strapi/design-system/Typography';
import getTrad from '../../utils/getTrad';

const FormModal = ({
  form,
  isCreating,
  isLoading,
  isOpen,
  onSubmit,
  onCancel,
  title,
  values,
  validationSchema,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalLayout
      onClose={onCancel}
      labelledBy="title"
    >
      <ModalHeader>
        <Typography textColor="neutral800" variant="omega" fontWeight="bold">
          {title}
        </Typography>
      </ModalHeader>
      <Formik
        onSubmit={onSubmit}
        initialValues={values}
        validateOnChange={false}
        // validationSchema={validationSchema}
        enableReinitialize
      >
        {({ errors, values, handleChange, isSubmitting }) => {
          return (
            <Form>
              <ModalBody>
                {
                  isLoading ? <Flex justifyContent="center"><Loader /></Flex> :
                  <Grid gap={5}>
                    {form.map((field, index) => {
                      if (field.type === 'divider') {
                        return (
                          <GridItem key={index} col={12} s={12}>
                            <Divider />
                          </GridItem>
                        );
                      }

                      return !field.hidden && (
                        <GridItem key={index} col={6} s={12} {...field.size}>
                          <GenericInput
                            {...field}
                            onChange={handleChange}
                            value={values[field.name]}
                            error={errors[field.name]}
                          />
                        </GridItem>
                      );
                    })}
                  </Grid>
                }
              </ModalBody>
              <ModalFooter
                startActions={
                  <Button disabled={isLoading} onClick={onCancel} variant="tertiary">
                    Cancel
                  </Button>
                }
                endActions={
                  <Button disabled={isLoading} loading={isSubmitting} type="submit">
                    {isCreating ? 'Save' : 'Update'}
                  </Button>
                }
              />
            </Form>
          );
        }}
      </Formik>
    </ModalLayout>
  );
};

export default FormModal;
