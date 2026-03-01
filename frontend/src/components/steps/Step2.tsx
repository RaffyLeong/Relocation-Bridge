import { useState } from "react";
import { DollarSign, Home, Plane, ArrowLeft, MapPin } from "lucide-react";
import { ComparisonCard } from "../ui/ComparisonCard";
import { type UserProfile, type SalaryData, type CostData, type VisaData, } from "../../types";
import { getMockDataForCity } from "../../data/mockData";

interface Step2Props {
  profile: UserProfile;
  onNext: ( data : {
    salary: SalaryData;
    cost: CostData;
    visa: VisaData | null
  }) => void;
  onBack: () => void;
}

const currencySymbol: Record<string, string> = {
  Macau: "MOP", "Hong Kong": "HKD",
  Guangzhou: "CNY",
  London: "£",
  Manchester: "£",
  Birmingham: "£",
  Leeds: "£",
  Liverpool: "£",
  Sheffield: "£",
  Bristol: "£",
};

const calculateAnnualSalary = (amount: number, frequency: string): number => {
  switch (frequency) {
    case "Hourly":
      return amount * 40 * 52;
    case "Daily":
      return amount * 260;
    case "Weekly":
      return amount * 52;
    case "Monthly":
      return amount * 12;
    case "Annually":
    default:
      return amount;
  }
};

const calculateLivingCost = (
  rent: number,
  transport: number,
  food: number,
): number => {
  return rent + transport + food;
};

export function Step2({ profile, onNext, onBack }: Step2Props) {
  const [activeTab, setActiveTab] = useState("salary");

  // salary state for current salary
  const [currentSalary, setCurrentSalary] = useState({
    frequency: "Annually",
    amount: 0,
  });
  // salary state for relocation salary
  const [targetSalary, setTargetSalary] = useState({
    frequency: "Annually",
    amount: 0,
  });

  // Living Cost for Current Cost
  const [currentCost, setCurrentCost] = useState({
    rent: 0,
    transport: 0,
    food: 0,
  });

  // Living Cost for targetCost
  const [targetCost, setTargetCost] = useState({
    rent: 0,
    transport: 0,
    food: 0,
  });

  const targetData = getMockDataForCity(profile.targetCity, profile.targetRole);
  const currentCurrency = currencySymbol[profile.currentCity];
  const targetCurrency = currencySymbol[profile.targetCity] || "£";

  // Salary
  const calCurrentSalary = calculateAnnualSalary(
    currentSalary.amount,
    currentSalary.frequency,
  );
  const calTargetSalary = calculateAnnualSalary(
    targetSalary.amount,
    targetSalary.frequency,
  );

  // Cost of Living
  const calCurrentLivingCost = calculateLivingCost(
    currentCost.rent,
    currentCost.transport,
    currentCost.food,
  );
  const calTargetLivingCost = calculateLivingCost(
    targetCost.rent,
    targetCost.transport,
    targetCost.food,
  );

  const [selectedVisa, setSelectedVisa] = useState<number | null>(null);

  // this part is for handle the data get pass to step 3 
  const handleNext = () => {
  // Prepare the data to pass to Step 3
  const salaryData = {
    currentAmount: calCurrentSalary,
    currentFrequency: currentSalary.frequency,
    currentCurrency: currentCurrency,
    targetAmount: calTargetSalary,
    targetFrequency: targetSalary.frequency,
    targetCurrency: targetCurrency,
  };

  const costData = {
    currentRent: currentCost.rent,
    currentTransport: currentCost.transport,
    currentFood: currentCost.food,
    currentTotal: calCurrentLivingCost,
    currentCurrency: currentCurrency,
    targetRent: targetCost.rent,
    targetTransport: targetCost.transport,
    targetFood: targetCost.food,
    targetTotal: calTargetLivingCost,
    targetCurrency: targetCurrency,
  };

  // Prepare visa data if selected
  let visaData = null;
  if (selectedVisa !== null) {
    const selected = targetData.visaOptions[selectedVisa];
    visaData = {
      selectedVisaName: selected.name,
      selectedVisaTimeline: selected.timeline,
      selectedVisaCost: selected.cost,
      selectedVisaRequirements: selected.requirements,
      isSettledStatus: selected.isSettledStatus || false
    };
  }

  // Pass all data to parent
  onNext({
    salary: salaryData,
    cost: costData,
    visa: visaData
  });
};

  const tabs = [
    { id: "salary", label: "Salary", icon: DollarSign },
    { id: "cost", label: "Cost of Living", icon: Home },
    { id: "visa", label: "Visa Path", icon: Plane },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b text-[20px] text-secondary-400">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 font-bold text-sm
              ${
                activeTab === tab.id
                  ? "text-dark bg-secondary-400 rounded-t-2xl"
                  : "text-secondary-400 hover:text-secondary-500"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Current Card */}
        <ComparisonCard
          className="text-[20px]"
          title={profile.currentCity}
          icon={<MapPin className="w-5 h-5" />}
        >
          {/* Current Card - Salary Section */}
          {activeTab === "salary" && (
            <>
              <div className="space-y-2">
                <label className="block text-[18px] font-bold text-gray-800 mt-6 uppercase tracking-wide">
                  Salary (Annually)
                </label>
                {currentSalary.amount > 0 ? (
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-primary-600">
                      {currentCurrency} - {calCurrentSalary.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl text-primary-600 font-bold">
                      {currentCurrency} - 0
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Selected Card - Salary Section - Salary */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Salary
                  </label>
                  <select
                    value={currentSalary.frequency}
                    onChange={(e) =>
                      setCurrentSalary({
                        ...currentSalary,
                        frequency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 border border-primary-200 rounded-xl text-[20px] text-primary-600 focus:outline-none focus:ring-2
                  focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    required
                  >
                    <option value="Annually">Annually</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Daily">Daily</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>

                {/* Selected Card - Salary Section - Your Pay */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Your Pay
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {currentCurrency}
                    </span>
                    <input
                      type="number"
                      value={currentSalary.amount || ""}
                      onChange={(e) =>
                        setCurrentSalary({
                          ...currentSalary,
                          amount: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Current Card - Living & Cost Section */}
          {activeTab === "cost" && (
            <>
              <div className="space-y-2">
                <label className="block text-[18px] font-bold text-gray-800 uppercase tracking-wide">
                  Total Cost (Monthly)
                </label>
                {currentCost.rent > 0 ||
                currentCost.transport > 0 ||
                currentCost.food > 0 ? (
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-primary-600">
                      {currentCurrency} {calCurrentLivingCost.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl text-primary-600 font-bold">
                      {currentCurrency} - 0
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Current Card - Living & Cost Section - Rent */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Rent
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {currentCurrency}
                    </span>
                    <input
                      type="number"
                      value={currentCost.rent || ""}
                      onChange={(e) =>
                        setCurrentCost({
                          ...currentCost,
                          rent: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>

                {/* Current Card - Living & Cost Section - Transport */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Transport
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {currentCurrency}
                    </span>
                    <input
                      type="number"
                      value={currentCost.transport || ""}
                      onChange={(e) =>
                        setCurrentCost({
                          ...currentCost,
                          transport: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>

                {/* Current Card - Living & Cost Section - Food */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Food
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {currentCurrency}
                    </span>
                    <input
                      type="number"
                      value={currentCost.food || ""}
                      onChange={(e) =>
                        setCurrentCost({
                          ...currentCost,
                          food: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "visa" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Plane className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">
                Visa options available for UK
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Select a UK city to view visa options
              </p>
            </div>
          )}
        </ComparisonCard>

        {/* Target Card */}
        <ComparisonCard
          className="text-[20px]"
          title={profile.targetCity}
          icon={<MapPin className="w-5 h-5" />}
          trend={
            activeTab === "salary"
              ? "positive"
              : activeTab === "cost"
                ? "negative"
                : "neutral"
          }
        >
          {/* Target Card - Salary Section */}
          {activeTab === "salary" && (
            <>
              <div className="space-y-2">
                <label className="block text-[18px] font-bold text-gray-800 mt-6 uppercase tracking-wide">
                  Salary (Annually)
                </label>
                {targetSalary.amount > 0 ? (
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-primary-600">
                      {targetCurrency} -{" "}
                      {calTargetSalary.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl text-primary-600 font-bold">
                      {targetCurrency} - 0
                    </p>
                  </div>
                )}
              </div>
              <div className="space-y-6">
                {/* Relocation Card - Salary Section - Salary */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Salary
                  </label>
                  <select
                    value={targetSalary.frequency}
                    onChange={(e) =>
                      setTargetSalary({
                        ...targetSalary,
                        frequency: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 border border-primary-200 rounded-xl text-[20px] text-primary-600 focus:outline-none focus:ring-2
                  focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                    required
                  >
                    <option value="Annually">Annually</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Daily">Daily</option>
                    <option value="Hourly">Hourly</option>
                  </select>
                </div>

                {/* Relocation Card - Salary Section - Your Pay */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Your Pay
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {targetCurrency}
                    </span>
                    <input
                      type="number"
                      value={targetSalary.amount || ""}
                      onChange={(e) =>
                        setTargetSalary({
                          ...targetSalary,
                          amount: Number(e.target.value),
                        })
                      }
                      className="w-full pl-13 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Target Card - Living & Cost Section */}
          {activeTab === "cost" && (
            <>
              <div className="space-y-2">
                <label className="block text-[18px] font-bold text-gray-800 mt-6 uppercase tracking-wide">
                  Total Cost (Monthly)
                </label>

                {targetCost.rent > 0 ||
                targetCost.transport > 0 ||
                targetCost.food > 0 ? (
                  <div className="bg-primary-50 p-4 rounded-xl">
                    <p className="text-2xl font-bold text-primary-600">
                      {targetCurrency} - {" "}
                      {calTargetLivingCost.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-2xl text-primary-600 font-bold">
                      {targetCurrency} - 0
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Relocation Card - Living & Cost Section - Rent */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mb-2 uppercase tracking-wide">
                    Rent
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {targetCurrency}
                    </span>
                    <input
                      type="number"
                      value={targetCost.rent || ""}
                      onChange={(e) =>
                        setTargetCost({
                          ...targetCost,
                          rent: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>

                {/* Relocation Card - Living & Cost Section - Transport */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Transport
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {targetCurrency}
                    </span>
                    <input
                      type="number"
                      value={targetCost.transport || ""}
                      onChange={(e) =>
                        setTargetCost({
                          ...targetCost,
                          transport: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>

                {/* Relocation Card - Living & Cost Section - Food */}
                <div className="space-y-2">
                  <label className="block text-[18px] font-bold text-gray-800 mt-6 mb-4 uppercase tracking-wide">
                    Food
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium pr-2 border-r border-gray-300">
                      {targetCurrency}
                    </span>
                    <input
                      type="number"
                      value={targetCost.food || ""}
                      onChange={(e) =>
                        setTargetCost({
                          ...targetCost,
                          food: Number(e.target.value),
                        })
                      }
                      className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-400 rounded-xl
                  text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Salary Number"
                      min="0"
                      step="1"
                    ></input>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Relocation Card - Visa Section */}
          {activeTab === "visa" && (
            <div className="space-y-4 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-lg font-bold text-gray-800 mb-2 sticky top-0 bg-white pt-2 pb-2 z-10">
                UK Visa Options
              </h3>
              {targetData.visaOptions.map((visa, index) => (
                <div
                  key={index}
                  className={`bg-white p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
          ${
            selectedVisa === index
              ? "border-primary-500 bg-primary-50"
              : "border-gray-200 hover:border-primary-300"
          }`}
                  onClick={() => setSelectedVisa(index)}
                >
                  <div className="flex items-start gap-3">
                    {/* Radio button */}
                    <div className="pt-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  selectedVisa === index
                    ? "border-primary-500"
                    : "border-gray-300"
                }`}
                      >
                        {selectedVisa === index && (
                          <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                        )}
                      </div>
                    </div>

                    {/* Visa content */}
                    <div className="flex-1">
                      <p className="font-bold text-lg text-primary-600 mb-2">
                        {visa.name}
                      </p>

                      <p className="text-sm text-gray-600 mt-1 mb-4">
                        {visa.description}
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-500 text-xs">
                            Timeline
                          </span>
                          <p className="font-semibold">{visa.timeline}</p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-500 text-xs">
                            Total Cost
                          </span>
                          <p className="font-semibold text-primary-600">
                            {visa.cost}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-500 text-xs">
                            Application Fee
                          </span>
                          <p className="font-semibold">{visa.applicationFee}</p>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-gray-500 text-xs">
                            IHS Surcharge
                          </span>
                          <p className="font-semibold">
                            {visa.healthcareSurcharge}
                          </p>
                        </div>
                      </div>

                      {/* Requirements */}
                      <details
                        className="mt-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <summary className="text-sm text-primary-500 cursor-pointer font-medium">
                          View requirements
                        </summary>
                        <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                          {visa.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show selected visa summary */}
              {selectedVisa !== null && (
                <div className="mt-6 p-4 bg-primary-100 rounded-xl border border-primary-300 sticky bottom-0 bg-opacity-95 backdrop-blur-sm">
                  <p className="text-sm font-medium text-primary-800">
                    You selected:{" "}
                    {targetData.visaOptions[selectedVisa].name}
                  </p>
                  <p className="text-xs text-primary-600 mt-1">
                    Total estimated cost:{" "}
                    {targetData.visaOptions[selectedVisa].cost}
                  </p>
                </div>
              )}
            </div>
          )}
        </ComparisonCard>
      </div>

      {/* Next and Back Button */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="text-[18px] font-bold flex items-center space-x-2 text-secondary-500 hover:text-secondary-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          onClick={handleNext}
          className="p-2 px-5 group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-secondary-400 text-dark font-medium"
        >
          <span className="absolute h-0 w-0 rounded-full bg-secondary-500 transition-all duration-400 group-hover:h-56 group-hover:w-48"></span>
          <span className="relative font-bold hover:text-white ">Next</span>
        </button>
      </div>
    </div>
  );
}
