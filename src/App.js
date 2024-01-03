import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { Children } from 'react';
import { useState } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import DefaultLayoutLogin from './layouts/DefaultLayoutLogin';
import DefaultLayoutTwoPage from './layouts/DefaultLayoutTwoPage';
import {
	publicRoutes,
	privateRoutes,
	notFoundRoute,
	privateRoutes2page,
	private1page,
	publicRoutes2,
} from './routes/index';
import { useEffect, useRef } from 'react';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import LandingPage from './pages/landing/LandingPage';
import { useWebSocket } from './context/WebSocketContext';

export default function App() {
	const [isLogin, setIsLogin] = useState(localStorage.getItem('accessToken') ? true : false);
	const currentUser = JSON.parse(localStorage.getItem('user'));
	const isComponentUnmounted = useRef(false);
	const { connectWebSocket, disconnectWebSocket, notification } = useWebSocket();
	// if (isLogin) {
	// 	window.addEventListener('beforeunload', async function (event) {
	// 		// Hủy bỏ sự kiện ngăn chặn đóng trang
	// 		event.preventDefault();

	// 		// Gọi hàm disconnectWebSocket(currentUser) và đợi nó hoàn thành
	// 		await disconnectWebSocket(currentUser);

	// 		// Thực hiện đóng trang
	// 		const confirmationMessage = 'Bạn có chắc muốn rời khỏi trang?';
	// 		event.returnValue = confirmationMessage;

	// 		return confirmationMessage;
	// 	});
	// }

	useEffect(() => {
		// Thực hiện kết nối khi component được mount`
		connectWebSocket(currentUser);
		return () => {
			// Kiểm tra xem component đã unmount chưa trước khi thực hiện disconnect
			if (!isComponentUnmounted.current) {
				disconnectWebSocket(currentUser);
			}
		};
	}, [currentUser]);

	const Page404 = notFoundRoute.component;

	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					{publicRoutes.map((route, index) => {
						const Page = route.component;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<DefaultLayoutLogin setIsLogin={setIsLogin}>
										<Page />
									</DefaultLayoutLogin>
								}
							/>
						);
					})}
					,
					{privateRoutes.map((route, index) => {
						const Page = route.component;
						const Left = route.Left;
						const Right = route.Right;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									isLogin ? (
										<>
											<DefaultLayout setIsLogin={setIsLogin} Left={<Left />} Right={<Right />}>
												<Page />
											</DefaultLayout>
										</>
									) : (
										<>
											<Navigate
												to="/
                            "
											/>
										</>
									)
								}
							/>
						);
					})}
					,
					{privateRoutes2page.map((route, index) => {
						const Page = route.component;
						const Left = route.Left;

						return (
							<Route
								key={index}
								path={route.path}
								element={
									isLogin ? (
										<>
											<DefaultLayoutTwoPage setIsLogin={setIsLogin} Left={<Left />}>
												<Page />
											</DefaultLayoutTwoPage>
										</>
									) : (
										<Navigate
											to="/
                            "
										/>
									)
								}
							/>
						);
					})}
					,
					{publicRoutes2.map((route, index) => {
						const Page = route.component;
						const Left = route.Left;

						return (
							<Route
								key={index}
								path={route.path}
								element={
									<>
										<DefaultLayoutTwoPage setIsLogin={setIsLogin} Left={<Left />}>
											<Page />
										</DefaultLayoutTwoPage>
									</>
								}
							/>
						);
					})}
					,
					{private1page.map((route, index) => {
						const Page = route.component;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									isLogin ? (
										<>
											<Topbar />
											<DefaultLayoutLogin setIsLogin={setIsLogin}>
												<Page />
											</DefaultLayoutLogin>
										</>
									) : (
										<Navigate
											to="/
                            "
										/>
									)
								}
							/>
						);
					})}
					,
					<Route
						key={notFoundRoute.path}
						path={notFoundRoute.path}
						element={
							<>
								<Topbar />
								<DefaultLayoutLogin>
									<LandingPage />
								</DefaultLayoutLogin>
								<Footer />
							</>
						}
					/>
					,
				</Routes>
			</div>
		</BrowserRouter>
	);
}
