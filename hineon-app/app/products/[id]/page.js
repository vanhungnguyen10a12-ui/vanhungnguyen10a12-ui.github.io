import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import ProductDetailClient from '../../../components/ProductDetailClient';

// Dòng này cho phép Next.js tạo trang cho các sản phẩm được thêm vào sau khi build
export const dynamicParams = true;

export async function generateStaticParams() {
    try {
        const productsCollection = collection(db, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const paths = productSnapshot.docs.map(doc => ({
            id: doc.id,
        }));
        return paths;
    } catch (error) {
        console.error("Lỗi khi tạo static params:", error);
        return [];
    }
}

async function getProductData(id) {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return JSON.parse(JSON.stringify({ id: docSnap.id, ...docSnap.data() }));
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        return null;
    }
}

export default async function ProductDetailPage({ params }) {
    const product = await getProductData(params.id);
    return <ProductDetailClient product={product} />;
}