import * as t from "io-ts";

import { Formik } from 'formik';
import { Button, Input, Label, Textarea } from 'theme-ui'

import { createPrompt1, createPrompt2, createPrompt3 } from "../prompts/createPrompts"



import {
  SharedSlice,
} from "@prismicio/types-internal/lib/customtypes";

import {
	SharedSliceContent,
	Document,
} from "@prismicio/types-internal/lib/content";
import { useState } from "react";

const DocumentArray = t.array(Document);
const SharedSliceContentArray = t.array(SharedSliceContent);

const initialValues = { brandIdentity: '', keyPropositions: '', slicePrompt: '' }
const Basic = () => {

  const [state, setState] = useState({ isSubmited: false, ...initialValues })

  const [mocks, setMocks] = useState('')

  if (state.isSubmited) {
    return (
      <div style={{ maxWidth: '640px'}}>
        <h4>
          Generated prompts:
        </h4>
        <Label>Prompt 1: create a Slice model</Label>
        <Textarea sx={{ height: '600px', mb: 3 }}>
          { createPrompt1({ slicePrompt: state.slicePrompt })}
        </Textarea>

        <Label>Prompt 2: create code for this slice</Label>
        <Textarea sx={{ height: '600px', mb: 3 }}>
          { createPrompt2()}
        </Textarea>

        <Label>Prompt 3: create brand aligned mocks</Label>
        <Input placeholder="Add generated mocks here" value={mocks} onChange={e => setMocks(e.target.value)}/>

        <Textarea value={createPrompt3({ ...state, mocks })} sx={{ height: '600px', mt: 3 }} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '640px'}}>
      <h4>
        Create a website using Prismic and SliceMachine!
      </h4>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setState({ isSubmited: true, ...values })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Label>Brand Identity</Label>
            <Input
              type="text"
              name="brandIdentity"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.brandIdentity}
              placeholder="We create positive engagement with communities around the globe regarding nature and animals"
              sx={{ mb: 3 }}
            />
            {errors.brandIdentity && touched.brandIdentity && errors.brandIdentity}
            <Label>Key Values</Label>
            <Input
              type="text"
              name="keyPropositions"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.keyPropositions}
              placeholder="We don't shame people but let them act responsibly. We like cute cats."
              sx={{ mb: 3 }}
            />
            {errors.keyPropositions && touched.keyPropositions && errors.keyPropositions}
            <Label>Slice description (model + design)</Label>
            <Input
              type="text"
              name="slicePrompt"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.slicePrompt}
              placeholder="A CallToAction with a title, a description, a Geopoint to display a Google Map, and a list of texts to display phone number and email"
              sx={{ mb: 3 }}
            />
            {errors.slicePrompt && touched.slicePrompt && errors.slicePrompt}
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Basic

