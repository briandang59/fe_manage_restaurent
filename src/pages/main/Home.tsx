const Home = () => {
    const dishes = [
        {
            name: "Phở Bò Truyền Thống",
            description: "Nước dùng hầm từ xương bò 12 tiếng, thơm ngon đậm vị.",
            price: "50,000đ",
            img: "https://images.unsplash.com/photo-1604908176997-27b3f24f1a0a",
        },
        {
            name: "Bún Chả Hà Nội",
            description: "Thịt nướng than hoa, bún tươi, nước chấm chua ngọt.",
            price: "45,000đ",
            img: "https://images.unsplash.com/photo-1608032278350-dc0c32d25d9e",
        },
        {
            name: "Gỏi Cuốn Tôm Thịt",
            description: "Cuốn tươi, chấm mắm nêm đặc trưng.",
            price: "30,000đ",
            img: "https://images.unsplash.com/photo-1625941414204-9b5f63a07e4f",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section */}
            <section
                className="relative h-[500px] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1555992336-03a23c4a4f91')",
                }}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4 text-center text-white">
                    <h1 className="mb-4 text-5xl font-bold">Nhà Hàng Mộc Quán</h1>
                    <p className="max-w-2xl text-lg">
                        Thưởng thức hương vị ẩm thực Việt Nam truyền thống, chế biến từ những nguyên
                        liệu tươi ngon nhất.
                    </p>
                    <button className="mt-6 rounded-full bg-red-500 px-6 py-3 text-lg text-white shadow-lg transition hover:bg-red-600">
                        Đặt bàn ngay
                    </button>
                </div>
            </section>

            {/* About section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-6 text-center text-3xl font-bold">Về Chúng Tôi</h2>
                <p className="mx-auto max-w-3xl text-center text-gray-700">
                    Nhà hàng Hương Việt mang đến cho thực khách những món ăn đặc trưng của ẩm thực
                    Việt Nam, với không gian ấm cúng và dịch vụ chu đáo. Chúng tôi luôn đặt chất
                    lượng và trải nghiệm của khách hàng lên hàng đầu.
                </p>
            </section>

            {/* Menu section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-10 text-center text-3xl font-bold">Thực Đơn Nổi Bật</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {dishes.map((dish, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-lg bg-white shadow-lg transition hover:shadow-2xl"
                        >
                            <img
                                src={dish.img}
                                alt={dish.name}
                                className="h-56 w-full object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">{dish.name}</h3>
                                <p className="mt-2 text-gray-600">{dish.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-lg font-bold text-red-500">
                                        {dish.price}
                                    </span>
                                    <button className="rounded-full bg-green-500 px-4 py-2 text-white transition hover:bg-green-600">
                                        Đặt món
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
