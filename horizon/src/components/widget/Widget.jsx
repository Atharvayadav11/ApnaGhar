import Card from "components/card";

const Widget = ({ icon, title, subtitle, progress }) => {
  return (
    <Card extra="!flex-row flex-grow items-center rounded-[20px]">
      <div className="flex h-[120px] w-auto flex-row items-center ml-4 mr-2">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <span className="flex items-center text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50 ml-4 flex flex-col justify-center w-full mr-4">
        <p className="font-dm text-sm font-medium text-gray-600">{title}</p>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
        {progress !== undefined && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Widget;
