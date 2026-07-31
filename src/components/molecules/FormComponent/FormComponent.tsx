'use client';
import type { RecaptchaHandle } from '@/components/atoms/Recaptcha/Recaptcha';
import { useFormik } from 'formik';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import Button from '@/components/atoms/CustomButton/Button';
import Recaptcha from '@/components/atoms/Recaptcha/Recaptcha';
import SuccessPopup from '@/components/atoms/SuccessPopup/SuccessPopup';
import TextFieldWithLabel from '@/components/atoms/TextField/TextField';
import { numberOfContainers as options } from '@/constants/dataConstants/DemoPageConstants';

type FieldKey = 'firstName' | 'lastName' | 'email' | 'number' | 'company' | 'containers' | 'message';

/** Formik field holding the reCAPTCHA token. Not a user-editable input. */
const RECAPTCHA_FIELD = 'recaptcha';

interface FormComponentProps {
  /**
   * External submit handler that will be called with the collected form data as FormData.
   * If omitted, the component will fallback to its default submit behaviour (showing the success popup).
   */
  onSubmit?: (data: FormData) => Promise<void> | void;
  /**
   * Array of field keys to show in the form. If omitted, all fields are shown.
   */
  fields?: FieldKey[];
  className?: string;
  FormButtonText: string;
  policy?: boolean;
  submitStatusProp?: boolean;
  fieldClass?: string;
  firstName?: string;
  emailFieldClass?: string;
  phoneFieldClass?: string;
  /** When true, empty message is allowed (career enquiry). When false, min length still applies if filled. */
  messageOptional?: boolean;
  /**
   * Renders the reCAPTCHA checkbox and requires a token before submitting.
   * Defaults to true: every consumer of this component is a public form, so a
   * new one should be protected unless it deliberately opts out.
   */
  withRecaptcha?: boolean;
}

const FormComponent = ({ onSubmit, fields, firstName = 'FirstName', className = 'grid grid-cols-2', FormButtonText, submitStatusProp, fieldClass, emailFieldClass, phoneFieldClass, messageOptional = false, withRecaptcha = true }: FormComponentProps) => {
  const [submitStatus, setSubmitStatus] = useState<boolean>(Boolean(submitStatusProp));
  const [error, setError] = useState(false);
  const [recaptchaUnavailable, setRecaptchaUnavailable] = useState(false);
  const recaptchaRef = useRef<RecaptchaHandle>(null);
  const t = useTranslations('DemoBookingPage.validation');
  const t2 = useTranslations('DemoBookingPage');

  // Sync local submitStatus with external prop so calling components can control
  // the visibility of the success popup after async actions.
  useEffect(() => {
    // Only update if the incoming prop changes.
    if (submitStatusProp !== undefined) {
      setSubmitStatus(Boolean(submitStatusProp));
    }
  }, [submitStatusProp]);

  // Determine which fields should be rendered. If none provided, show all.
  const defaultFields: FieldKey[] = ['firstName', 'lastName', 'email', 'number', 'company', 'containers', 'message'];
  const activeFields: FieldKey[] = fields ?? defaultFields;

  // Build initial values object dynamically based on active fields
  const initialValues = activeFields.reduce<Record<string, string>>((acc, key) => {
    acc[key] = '';
    return acc;
  }, {});

  if (withRecaptcha) {
    initialValues[RECAPTCHA_FIELD] = '';
  }

  // Build validation schema shape for active fields only
  const validationShape: { [key: string]: Yup.AnySchema } = {};

  if (activeFields.includes('firstName')) {
    validationShape.firstName = Yup.string()
      .trim()
      .min(2, t('min2Chars'))
      .matches(/^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u0400-\u04FF]+([\s\-'][a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u0400-\u04FF]+)*$/, t('nameFormat'))
      .required(t('required'));
  }
  if (activeFields.includes('lastName')) {
    validationShape.lastName = Yup.string()
      .trim()
      .min(2, t('min2Chars'))
      .matches(/^[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u0400-\u04FF]+([\s\-'][a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\u0400-\u04FF]+)*$/, t('nameFormat'))
      .required(t('required'));
  }
  if (activeFields.includes('email')) {
    validationShape.email = Yup.string()
      .trim()
      .lowercase()
      .matches(
        /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{3,}$/i,
        t('emailnvalid'),
      )
      .required(t('required'))
      .min(5, t('min5Chars'))
      .max(254, t('max254Chars'))
      .test('no-consecutive-dots', t('emailnvalid'), (value) => {
        return value ? !value.includes('..') : true;
      })
      .test('local-part-min', t('emailnvalid'), (value) => {
        if (!value) {
          return true;
        }
        const localPart = value.split('@')[0];
        return typeof localPart === 'string' && localPart.length >= 3;
      })
      .test('local-part-max', t('emailnvalid'), (value) => {
        if (!value) {
          return true;
        }
        const localPart = value.split('@')[0];
        return typeof localPart === 'string' && localPart.length <= 64; // RFC standard
      })
      .test('no-edge-dots', t('emailnvalid'), (value) => {
        if (!value) {
          return true;
        }
        const localPart = value.split('@')[0];
        return typeof localPart === 'string' && !localPart.startsWith('.') && !localPart.endsWith('.');
      });
  }
  if (activeFields.includes('number')) {
    validationShape.number = Yup.string()
      .matches(/^\+?[0-9\s\-()]{7,20}$/, t('pleaseEnterValidTel'))
      .min(7, t('telInvalid'))
      .required(t('required'));
  }
  if (activeFields.includes('company')) {
    validationShape.company = Yup.string()
      .trim()
      .min(2, t('companyMin2Chars'))
      .max(100, t('companyMax100Chars'))
      .matches(/^(?=.*[a-z])[a-z0-9\s\-&.,'"()]+$/i, t('companyMustHaveLetter'))
      .required(t('required'));
  }
  if (activeFields.includes('containers')) {
    validationShape.containers = Yup.string().required(t('required'));
  }
  if (activeFields.includes('message')) {
    const baseMessageSchema = Yup.string()
      .trim()
      .max(1000, t('messageMax1000Chars'))
      .matches(/^[a-z0-9\s\-.,!?'"()&@#$%\u00C0-\u017F]*$/i, t('messageInvalidChars'));

    // Allow empty; enforce min length only when the user typed something.
    validationShape.message = messageOptional
      ? baseMessageSchema
          .transform(value => (value === '' ? undefined : value))
          .test('min-if-present', t('messageWarning'), value => !value || value.length >= 20)
          .notRequired()
      : baseMessageSchema.min(20, t('messageWarning'));
  }

  if (withRecaptcha) {
    validationShape[RECAPTCHA_FIELD] = Yup.string().required(t('recaptchaRequired'));
  }

  const validationSchema = Yup.object(validationShape);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm, setSubmitting, setFieldValue }) => {
      // If an external submit handler is provided, use it.
      try {
        if (onSubmit) {
          // Convert raw values to FormData to keep the handler signature consistent.
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            // The captcha token is appended below under the name the API
            // expects, so it is skipped here.
            if (key === RECAPTCHA_FIELD) {
              return;
            }
            formData.append(key, value as string);
          });

          if (withRecaptcha) {
            formData.append('recaptchaToken', values[RECAPTCHA_FIELD] ?? '');
          }

          await onSubmit(formData);
          resetForm();
          return;
        }

        setSubmitStatus(true);
        resetForm();
        setTimeout(() => {
          setSubmitStatus(false);
        }, 4000);
      } catch (error) {
        console.error(error);
        setSubmitStatus(false);
        setError(true);
      } finally {
        setSubmitting(false);

        // reCAPTCHA v2 tokens are single use. Whether the submission succeeded
        // or failed, the token is spent, so the widget has to be reset before
        // the user can submit again — otherwise a retry is rejected by Google
        // with `timeout-or-duplicate`.
        if (withRecaptcha) {
          recaptchaRef.current?.reset();
          setFieldValue(RECAPTCHA_FIELD, '', false);
        }
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`gap-5 ${className}`}
    >
      {activeFields.includes('firstName') && (
        <div className="col-span-2 sm:col-span-1">
          <TextFieldWithLabel
            type="text"
            required
            label={firstName}
            value={formik.values.firstName ?? ''}
            onChange={formik.handleChange}
            name="firstName"
            onBlur={formik.handleBlur}
            error={(formik.touched.firstName || formik.values.firstName) && formik.errors.firstName}
            maxLength={100}
            autoComplete="given-name"
            aria-describedby="firstName-error"
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('lastName') && (
        <div className="col-span-2 sm:col-span-1">
          <TextFieldWithLabel
            type="text"
            required
            label={t2('lastName')}
            value={formik.values.lastName ?? ''}
            onChange={formik.handleChange}
            name="lastName"
            onBlur={formik.handleBlur}
            error={(formik.touched.lastName || formik.values.lastName) && formik.errors.lastName}
            maxLength={100}
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('email') && (
        <div className={emailFieldClass || 'col-span-2'}>
          <TextFieldWithLabel
            type="email"
            required
            label={t2('email')}
            value={formik.values.email ?? ''}
            onChange={formik.handleChange}
            name="email"
            onBlur={formik.handleBlur}
            error={(formik.touched.email || formik.values.email) && formik.errors.email}
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('number') && (
        <div className={phoneFieldClass || 'col-span-2'}>
          <TextFieldWithLabel
            type="tel"
            required
            label={t2('phoneNumber')}
            value={formik.values.number ?? ''}
            onChange={formik.handleChange}
            name="number"
            onBlur={formik.handleBlur}
            error={(formik.touched.number || formik.values.number) && formik.errors.number}
            maxLength={100}
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('company') && (
        <div className="col-span-2">
          <TextFieldWithLabel
            type="text"
            required
            label={t2('companyName')}
            value={formik.values.company ?? ''}
            onChange={formik.handleChange}
            name="company"
            onBlur={formik.handleBlur}
            error={(formik.touched.company || formik.values.company) && formik.errors.company}
            maxLength={100}
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('containers') && (
        <div className="col-span-2">
          <TextFieldWithLabel
            variant="select"
            label={t2('containers')}
            name="containers"
            value={formik.values.containers ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.containers || formik.values.containers) && formik.errors.containers}
            options={options}
            className={fieldClass}
          />
        </div>
      )}
      {activeFields.includes('message') && (
        <div className="col-span-2">
          <TextFieldWithLabel
            variant="textarea"
            label="Message"
            name="message"
            value={formik.values.message ?? ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.message || formik.values.message) && formik.errors.message}
            maxLength={1000}
            className={fieldClass}
          />
        </div>
      )}
      {withRecaptcha && (
        <div className="col-span-2 z-10">
          <Recaptcha
            ref={recaptchaRef}
            onChange={(token) => {
              formik.setFieldValue(RECAPTCHA_FIELD, token);
              if (token) {
                setRecaptchaUnavailable(false);
              }
            }}
            onLoadError={() => setRecaptchaUnavailable(true)}
          />
          {recaptchaUnavailable
            ? (
                <div className="text-red-500 text-size-5xs ml-space-07 mt-1">
                  {t('recaptchaUnavailable')}
                </div>
              )
            : formik.touched[RECAPTCHA_FIELD] && formik.errors[RECAPTCHA_FIELD]
              ? (
                  <div className="text-red-500 text-size-5xs ml-space-07 mt-1">
                    {formik.errors[RECAPTCHA_FIELD] as string}
                  </div>
                )
              : null}
        </div>
      )}
      <div className="col-span-2 z-10 mt-space-06">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          variant="primary"
          animation={true}
          arrow={true}
          arrowClassName="size-space-05"
          text={formik.isSubmitting ? 'Submitting...' : FormButtonText}
          mainClass="w-fit gap-space-05 mx-auto"
        />
      </div>

      {/* Only show internal popups when no external onSubmit is provided */}
      {!onSubmit && submitStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <SuccessPopup />
        </div>
      )}
      {!onSubmit && error && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="max-w-space-290 bg-red-300 opacity-20 text-red-400 border-red-400 p-space-10">
            {t2('errorMessage')}
          </div>
        </div>
      )}
    </form>
  );
};

export default FormComponent;
