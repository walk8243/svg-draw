export const Card = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="flex flex-col grow items-center gap-6 p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-600">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
    <div className="w-full text-gray-700 dark:text-gray-200">
      {children}
    </div>
  </div>
)
