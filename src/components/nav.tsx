import Link from "next/link";
import { useTranslation } from 'react-i18next';

export default function Nav() {
    const { t } = useTranslation();
    return (
        <ul className="mt-3">
            <li className="my-1"><Link className="hover:bg-gray-500" href="/">{t('Home')}</Link></li>
            <li className="my-1"><Link className="hover:bg-gray-500" href="/products">{t('Products')}</Link></li>
            <li className="my-1"><Link className="hover:bg-gray-500" href="/products/create">{t('Create_Product')}</Link></li>
        </ul>
    )
}