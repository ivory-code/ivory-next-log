export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        죄송합니다, 요청하신 페이지를 찾을 수 없습니다.
      </p>
      <p className="text-gray-500 mt-2">
        페이지가 이동되었거나 삭제되었을 수 있습니다.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow transition-all duration-200">
        홈으로 이동하기
      </a>
    </div>
  )
}
