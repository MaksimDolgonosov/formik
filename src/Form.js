import { useFormik } from 'formik';
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

const Form = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0,
            text: '',
            currency: 'USD',
            terms: false
        },
        validationSchema: object({
            name: string().min(3, 'Минимум 3 символа!').required('Обязательное поле!'),
            email: string().email('Неправильный email').required('Обязательное поле!'),
            amount: number().required('Обязательное поле!').positive().integer().min(1, 'Минимум 1 единица валюты'),
            text: string().min(10, 'Минимум `10 символов!'),
            currency: string().required('Выберете валюту пожертвования'),
            terms: boolean().required('Обязательное согласие').oneOf([true], "Необходимо согласие!")
        }),
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });

    return (
        <form className="form">
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur} />
            {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.amount}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                onChange={formik.handleChange}
                value={formik.values.currency}>
                <option value="">Выберите валюту</option>
                <option value="USD">USD</option>
                <option value="UAH">UAH</option>
                <option value="RUB">RUB</option>
            </select>
            <label htmlFor="text">Ваше сообщение</label>
            <textarea
                id="text"
                name="text"
                onChange={formik.handleChange}
                value={formik.values.text}
            />
            <label className="checkbox">
                <input name="terms" type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.terms}
                    onBlur={formik.handleBlur} />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div> : null}
            <button type="submit" >Отправить</button>
        </form>
    ) 
}

export default Form;