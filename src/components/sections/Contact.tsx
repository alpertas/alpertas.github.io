import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../data/translations';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// EmailJS configuration - Add these to your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'your_recaptcha_site_key';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .required(t.contact.form.validation.nameRequired)
      .min(2, t.contact.form.validation.nameMinLength),
    email: Yup.string()
      .email(t.contact.form.validation.emailInvalid)
      .required(t.contact.form.validation.emailRequired),
    subject: Yup.string()
      .required(t.contact.form.validation.subjectRequired)
      .min(5, t.contact.form.validation.subjectMinLength),
    message: Yup.string()
      .required(t.contact.form.validation.messageRequired)
      .min(10, t.contact.form.validation.messageMinLength),
  });

  const handleSubmit = async (
    values: FormData,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    try {
      // Verify reCAPTCHA
      const recaptchaValue = recaptchaRef.current?.getValue();
      if (!recaptchaValue) {
        alert(t.contact.form.validation.recaptchaRequired);
        setSubmitting(false);
        return;
      }

      // Prepare email parameters
      const templateParams = {
        to_email: import.meta.env.VITE_TO_EMAIL || 'alpertas.cpp@gmail.com',
        from_name: values.name,
        from_email: values.email,
        subject: values.subject,
        message: values.message,
        'g-recaptcha-response': recaptchaValue,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      resetForm();
      recaptchaRef.current?.reset();

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: t.contact.info.email,
      href: `mailto:${t.contact.info.email}`,
    },
    {
      icon: MapPin,
      label: t.contact.info.locationLabel,
      value: t.contact.info.location,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={`contact-header-${language}`}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-gray-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            key={`contact-info-${language}`}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={`contact-info-${info.label}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <info.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{info.label}</h3>
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            key={`contact-form-${language}`}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Card className="p-8">
              <div className="relative">
                {/* Blur overlay */}
                <div className="absolute inset-0 bg-white/50 dark:bg-dark-surface/50 backdrop-blur-sm rounded-lg z-10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {t.contact.form.comingSoon}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t.contact.form.comingSoonDescription}
                    </p>
                  </div>
                </div>

                <div className="filter blur-sm pointer-events-none">
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      subject: '',
                      message: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.contact.form.name}
                            </label>
                            <Field
                              name="name"
                              type="text"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors duration-300"
                              placeholder={t.contact.form.name}
                            />
                            <ErrorMessage
                              name="name"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              {t.contact.form.email}
                            </label>
                            <Field
                              name="email"
                              type="email"
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors duration-300"
                              placeholder={t.contact.form.email}
                            />
                            <ErrorMessage
                              name="email"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.contact.form.subject}
                          </label>
                          <Field
                            name="subject"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors duration-300"
                            placeholder={t.contact.form.subject}
                          />
                          <ErrorMessage
                            name="subject"
                            component="p"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t.contact.form.message}
                          </label>
                          <Field
                            name="message"
                            as="textarea"
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-bg dark:text-white transition-colors duration-300 resize-none"
                            placeholder={t.contact.form.message}
                          />
                          <ErrorMessage
                            name="message"
                            component="p"
                            className="mt-1 text-sm text-red-500"
                          />
                        </div>

                        {/* reCAPTCHA */}
                        <div className="flex justify-center">
                          <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={RECAPTCHA_SITE_KEY}
                            theme="light"
                            hl={language}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center space-x-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>{isSubmitting ? t.contact.form.sending : t.contact.form.send}</span>
                        </Button>

                        {/* Status Messages */}
                        {submitStatus === 'success' && (
                          <motion.div
                            key={`contact-success-${language}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                          >
                            <p className="text-green-600 dark:text-green-400 text-center">
                              {t.contact.form.success}
                            </p>
                          </motion.div>
                        )}

                        {submitStatus === 'error' && (
                          <motion.div
                            key={`contact-error-${language}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                          >
                            <p className="text-red-600 dark:text-red-400 text-center">
                              {t.contact.form.error}
                            </p>
                          </motion.div>
                        )}
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
