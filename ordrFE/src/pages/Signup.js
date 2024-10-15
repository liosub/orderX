import React, { useEffect, useState } from "react"
import { Field, Form, Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import { Container, Grid } from '@material-ui/core'
import PasswordField from 'material-ui-password-field'
import { Link, useLocation } from "react-router-dom"
import Select from "react-select"
import * as Yup from 'yup'
import { useAuth } from "../utils/Auth";
import { setToken } from "../utils";
import { fetchAllIndustries, signup } from "../services"
import { useMutation, useQuery } from "react-query"
import Cookies from "js-cookie";
import EmailValidator from "company-email-validator";
import qs from 'qs'
import { useTranslation } from 'react-i18next';

function Signup() {
    const { t } = useTranslation();
    const { search: queryString } = useLocation();
  const { redirect_to } = qs.parse(queryString, { ignoreQueryPrefix: true });
  const { setAuth } = useAuth()
  const [user, setUser] = useState({
    name: "",
    company_name: "",
    company_website: "",
    company_role: null,
    company_industry: null,
    phone_number: "",
    country_code: null,
    email: "",
    password: "",
    referral: "",
    terms_accepted: false,
    is_lead: false
  })

  //   useEffect(() => {
  //     document.body.style = `background-image: url("${process.env.PUBLIC_URL}/signup-bg.svg"); background-size: cover; background-repeat: no-repeat; background-position: center`
  // }, [])

  const { data: industries, isIndustriesLoading } = useQuery(['industries'], () => fetchAllIndustries(), {
    select: data => data.sectors.map(e => ({ label: e.name, value: e.id })),
  })

  const { mutate: addUser, error } = useMutation(() => signup(user), {
    select: (data) => data.user,
    onSuccess: (data) => {
      setToken("token", { value: data.accessToken })
      setAuth(true)
      const { password, ...trackData } = user;
      trackData.referrer = document.referrer;
      localStorage.setItem('trackData', JSON.stringify(trackData));
      window.location.href = `${process.env.REACT_APP_STLLR_URL}experts${redirect_to ? `?redirect_to=${encodeURIComponent(redirect_to)}` : ``}`
    },
    onError: error => console.log(error)
  })

  const [companyRoles, setCompanyRoles] = useState([
    { label: 'CEO / Founder', value: 'CEO / Founder' },
    { label: 'CMO or C-Level', value: 'CMO or C-Level' },
    { label: 'Director of Marketing', value: 'Director of Marketing' },
    { label: 'Senior Marketer', value: 'Senior Marketer' },
    { label: 'Marketing Specialist', value: 'Marketing Specialist' },
    { label: 'Product Manager', value: 'Product Manager' },
    { label: 'Freelancer', value: 'Freelancer' },
    { label: 'Other', value: 'Other' },
  ])

  const referralOptions = [
    {
      label: 'Search Engines',
      value: 'Search Engines',
    },
    {
      label: 'Social Media',
      value: 'Social Media',
    },
    {
      label: 'Another Company’s Website',
      value: 'Another Company’s Website',
    },
    {
      label: 'Blog',
      value: 'Blog',
    },
    {
      label: 'Referral',
      value: 'Referral',
    },
    {
      label: 'Event or Webinar',
      value: 'Event or Webinar',
    },
    {
      label: 'A Friend',
      value: 'A Friend',
    },
    {
      label: 'Falak',
      value: 'Falak',
    },
    {
      label: 'Flat6Labs MENA',
      value: 'Flat6Labs MENA',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ]

  const userSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string().email('Please enter a valid email')
      // .test('is-company-email', 'Please enter a company email', value => Boolean(EmailValidator.isCompanyEmail(value)))
      .required('Please enter your email'),
    phone_number: Yup.string().required('Please enter your phone number'),
    company_role: Yup.string().nullable(true),
    company_industry: Yup.string().nullable(true),
    company_website: Yup.string().required('Please enter your company website'),
    // referral: Yup.string().required('Please choose an option'),
    company_name: Yup.string().required('Please enter your company name'),
    password: Yup.string().min(8).required('Please enter your password'),
    terms_accepted: Yup.boolean().equals([true], 'Please accept terms and conditions'),
  })

  return (
    <>
      <Container maxWidth="lg" className="mt-35">
        <Grid container direction="column" style={{ marginBottom: 50 }}>
          <Grid item lg={3} sm={3} class="is-flex fdr aic">
            <a href="/">
              <img src={`${process.env.REACT_APP_STLLR_STATIC_URL}stllr-dark-beta-icon.svg`} alt="Stllr.network" height="46" />
            </a>
            <a href="https://www.stllr.network/en/discover/" className="ml-20 fw4">{t('Explore Packages')}</a>
          </Grid>
        </Grid>

        <Grid container direction="row">

          <Grid item lg={3} />

          <Grid item lg={6}>
            <div className="is-flex aic fdc mb-10" style={{ padding: 25 }}>
              <div className="is-flex fdc aic jcc">
                <h1
                  className="lhn fw7 mb-20"
                >
                  {t('Sign up')}
                </h1>

                <h3 className="fw4 mb-20">{t('Let our stellar independents grow your brand.')}</h3>

                <a className="mb-20 black-text" href={`/login${redirect_to ? `?redirect_to=${encodeURIComponent(redirect_to)}` : ''}`}>{t('Got an account?')} <b>{t('Login here')}</b></a>
              </div>
              <Grid container>
                <Grid item lg={12}>
                  <Formik
                    initialValues={user}
                    validationSchema={userSchema}
                    onSubmit={async (data) => {
                      setUser({ ...data, uuid: uuidv4() })
                      addUser()
                    }}
                  >
                    {({ errors, touched, isSubmitting, handleChange, handleBlur, values, setFieldValue }) => (
                      <Form className="form">
                        <div className="group">
                          <Grid container direction="row" spacing={3}>
                            <Grid item lg={6}>
                              <label>{t('Full name*')}</label>
                              <input
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="stllr-input"
                                type="text"
                              />
                              {errors.name && touched.name && (
                                <span className="v-error">{errors.name}</span>
                              )}
                            </Grid>

                            <Grid item lg={6}>
                              <label>{t('Phone number*')}</label>
                              <PhoneInput
                                name="phone_number"
                                excludeCountries="['cg', 'cd', 'irn', 'mmr', 'sdn', 'irq', 'civ', 'prk', 'syr', 'zwe', 'cub', 'blr', 'kp', 'lbr']"
                                type="text"
                                value={user.phone_number}
                                inputClass={"stllr-input"}
                                inputProps={{
                                  name: "phone_number",
                                  country: "eg",
                                  required: true,
                                }}
                                enableAreaCodes={true}
                                country="eg"
                                onChange={(phone, country) => (setFieldValue("phone_number", phone), setFieldValue("country_code", Number(country.dialCode)))}
                                onBlur={handleBlur}
                              />
                              {errors.phone_number && touched.phone_number && (
                                <span className="v-error">{errors.phone_number}</span>
                              )}
                            </Grid>
                          </Grid>
                        </div>

                        <div className="group">
                          <Grid container direction={"row"} spacing={3}>
                            <Grid item lg={6}>
                              <label>{t('Company name*')}</label>
                              <input
                                name="company_name"
                                className="stllr-input"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                              />
                              {errors.company_name && touched.company_name && (
                                <span className="v-error">{errors.company_name}</span>
                              )}
                            </Grid>

                            <Grid item lg={6}>
                              <label>{t('Company website*')}</label>
                              <input
                                name="company_website"
                                // value={user.company_website}
                                className="stllr-input"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="text"
                              />
                              {errors.company_website && touched.company_website && (
                                <span className="v-error">{errors.company_website}</span>
                              )}
                            </Grid>
                          </Grid>
                        </div>

                        <div className="group">
                          <Grid container direction="row" spacing={3}>
                            <Grid item lg={6}>
                              <label>{t('Company role')}</label>
                              <Select
                                name="company_role"
                                options={companyRoles}
                                onChange={({ value }) => setFieldValue("company_role", value)}
                                styles={{
                                  control: base => ({
                                    ...base,
                                    height: 40,
                                    minHeight: 40
                                  })
                                }}
                              />
                              {errors.company_role && touched.company_role && (
                                <span className="v-error">{errors.company_role}</span>
                              )}
                            </Grid>

                            <Grid item lg={6}>
                              <label>{t('Company industry')}</label>
                              <Select
                                name="company_industry"
                                options={industries}
                                isLoading={isIndustriesLoading}
                                onChange={({ value }) => setFieldValue("company_industry", value)}
                                styles={{
                                  control: base => ({
                                    ...base,
                                    height: 40,
                                    minHeight: 40
                                  })
                                }}
                              />
                              {errors.company_industry && touched.company_industry && (
                                <span className="v-error">{errors.company_industry}</span>
                              )}
                            </Grid>

                            <Grid item lg={6}>
                              <label>Email*</label>
                              <input
                                name="email"
                                className="stllr-input"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="email"
                              />
                              {errors.email && touched.email && (
                                <span className="v-error">{errors.email}</span>
                              )}
                            </Grid>

                            <Grid item lg={6}>
                              <label>{t('Choose a password*')}</label>
                              <PasswordField
                                name="password"
                                className="stllr-input"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                type="password"
                                disableUnderline
                              />
                              {errors.password && touched.password && (
                                <span className="v-error">{errors.password}</span>
                              )}
                            </Grid>
                          </Grid>
                        </div>

                        <div className="group">
                          <Grid container direction="row" spacing={3}>

                            {/* <Grid item lg={6}>
                            <label>How did you know about Stllr?*</label>
                            <Select
                              name="referral"
                              options={referralOptions}
                              onChange={({ value }) => setFieldValue("referral", value)}
                              styles={{
                                control: base => ({
                                  ...base,
                                  height: 40,
                                  minHeight: 40
                                })
                              }}
                            />
                            {errors.referral && touched.referral && (
                              <span className="v-error">{errors.referral}</span>
                            )}
                          </Grid> */}
                          </Grid>
                        </div>

                        <label className="is-flex aic">
                          <Field
                            type="checkbox"
                            name="terms_accepted"
                            className="text-blue-600 border-gray-300 rounded shadow-sm"
                          />{' '}
                          <span className="ml-2">
                            {t('I agree to')}
                            {' '}
                            <Link to="/terms-and-conditions" target="_blank">
                              {t('Terms & Conditions')}
                            </Link>
                            {t(' and ')}
                            <Link to='/privacy-policy' target="_blank">
                              {t('Privacy Policy')}
                            </Link>
                          </span>
                        </label>
                        {errors.terms_accepted && touched.terms_accepted ? (
                          <span className="v-error">
                            {errors.terms_accepted}
                          </span>
                        ) : null}

                        {error ? (
                          <p
                            role="alert"
                            className="text-center"
                            style={{
                              color: 'red',
                              marginTop: 7,
                              marginBottom: 9,
                            }}
                          >
                            {error.data.message}
                          </p>
                        ) : null}

                        <div
                          className="lg:flex aic jcsb"
                          style={{ marginTop: 40 }}
                        >
                          <button
                            className={`stllr-btn primary btn-lg mb-15 ${isSubmitting && 'is-loading'
                              }`}
                            style={{ width: 160 }}
                            type="submit"
                          >
                            {t('Next')}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </Grid>
              </Grid>
            </div>
          </Grid>

          {/* <Grid item lg={4}>
              <h1 className="white lhn mb-75">Grow and work with companies of tomorrow.</h1>

              <img src={`${process.env.PUBLIC_URL}/cybertalents.svg`} className="mb-50" alt="Cyber talents" />
              <img src={`${process.env.PUBLIC_URL}/consoleya.svg`} className="mb-50" alt="Consoleya" />
              <img src={`${process.env.PUBLIC_URL}/hesas-logo.svg`} className="mb-50" alt="Hesas Masr" />
          </Grid> */}
        </Grid>
      </Container>
    </>
  )
}

export default Signup
