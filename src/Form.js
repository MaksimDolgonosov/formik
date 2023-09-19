import { Formik, Field, Form, ErrorMessage } from 'formik';
import { object, string, number, boolean } from 'yup';
// const validate = values => {
//     const errors = {};
//     if (!values.name) {
//         errors.name = 'Обязательное поле';
//     } else if (values.name.length < 3) {
//         errors.name = 'Минимум 3 символа!';
//     }

//     if (!values.amount) {
//         errors.amount = 'Обязательное поле для пожертвования';
//     } else if (values.amount < 1) {
//         errors.amount = 'Must be 20 characters or less';
//     }

//     if (!values.email) {
//         errors.email = 'Обязательное поле';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Неправильный email';
//     }

//     return errors;
// };

const DonationForm = () => {

    return (
        <Formik initialValues={{
            name: '',
            email: '',
            amount: 0,
            text: '',
            currency: 'USD',
            terms: false
        }}
            validationSchema={object({
                name: string().min(3, 'Минимум 3 символа!').required('Обязательное поле!'),
                email: string().email('Неправильный email').required('Обязательное поле!'),
                amount: number().required('Обязательное поле!').positive().integer().min(1, 'Минимум 1 единица валюты'),
                text: string().min(10, 'Минимум 10 символов!'),
                currency: string().required('Выберете валюту пожертвования'),
                terms: boolean().required('Обязательное согласие').oneOf([true], "Необходимо согласие!")
            })}
            onSubmit={values => {
                console.log(JSON.stringify(values, null, 2));
            }}>
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <label htmlFor="name">Ваше имя</label>
                <Field id="name" name="name" type="text" />
                <ErrorMessage name="name" className="error" component={"div"} />
                {/* {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null} */}
                <label htmlFor="email">Ваша почта</label>
                <Field id="email" name="email" type="email" />
                <ErrorMessage name="email" className="error" component={"div"} />
                <label htmlFor="amount">Количество</label>
                <Field id="amount" name="amount" type="number" />
                <ErrorMessage name="amount" className="error" component={"div"} />
                <label htmlFor="currency">Валюта</label>
                <Field id="currency" name="currency" as="select">
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage name="currency" className="error" component={"div"} />
                <label htmlFor="text">Ваше сообщение</label>
                <Field id="text" name="text" as="textarea" />
                <ErrorMessage name="text" className="error" component={"div"} />
                <label className="checkbox">
                    <Field name="terms" type="checkbox" />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage name="terms" className="error" component={"div"} />
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )


    // const formik = useFormik({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         amount: 0,
    //         text: '',
    //         currency: 'USD',
    //         terms: false
    //     },
    //     validationSchema: object({
    //         name: string().min(3, 'Минимум 3 символа!').required('Обязательное поле!'),
    //         email: string().email('Неправильный email').required('Обязательное поле!'),
    //         amount: number().required('Обязательное поле!').positive().integer().min(1, 'Минимум 1 единица валюты'),
    //         text: string().min(10, 'Минимум `10 символов!'),
    //         currency: string().required('Выберете валюту пожертвования'),
    //         terms: boolean().required('Обязательное согласие').oneOf([true], "Необходимо согласие!")
    //     }),
    //     onSubmit: values => {
    //         console.log(JSON.stringify(values, null, 2));
    //     },
    // });

}

export default DonationForm;