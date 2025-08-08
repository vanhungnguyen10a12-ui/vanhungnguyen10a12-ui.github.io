import { db } from '../../../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import ProductDetailClient from '../../../components/ProductDetailClient'; // Import component client mới

// Hàm này chạy lúc build để báo cho Next.js biết cần tạo những trang nào
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

// Hàm này lấy dữ liệu cho một sản phẩm cụ thể
async function getProductData(id) {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // Chuyển đổi dữ liệu để có thể truyền từ Server sang Client Component
            return JSON.parse(JSON.stringify({ id: docSnap.id, ...docSnap.data() }));
        }
        return null;
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
        return null;
    }
}

// Component chính của trang, chạy ở server
export default async function ProductDetailPage({ params }) {
    const product = await getProductData(params.id);

    // Truyền dữ liệu đã lấy được xuống cho component client để hiển thị
    return <ProductDetailClient product={product} />;
}