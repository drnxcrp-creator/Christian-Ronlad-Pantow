import { useState } from "react";
import { Compass, Wallet, ArrowRight, CheckCircle2, MapPin, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LanguageCode, translations } from "../utils/translations";

interface WisataProps {
  lang: LanguageCode;
}

export default function Wisata({ lang }: WisataProps) {
  const [selectedSpot, setSelectedSpot] = useState<string | null>("tunan");

  // Cost estimator inputs state
  const [groupSize, setGroupSize] = useState<number>(1);
  const [transportType, setTransportType] = useState<"none" | "motor" | "car">("motor");
  const [rentGazebo, setRentGazebo] = useState<boolean>(false);
  const [needGuide, setNeedGuide] = useState<boolean>(false);
  const [foodPackage, setFoodPackage] = useState<boolean>(false);

  const t = translations[lang] || translations.id;

  // Tourism Spots Data
  const spots = [
    {
      id: "tunan",
      name: lang === "la" ? "Cataracta Tunan" : lang === "zh" ? "图南瀑布" : lang === "ko" ? "투난 폭포" : lang === "vi" ? "Thác Tunan" : lang === "en" ? "Tunan Waterfall" : "Air Terjun Tunan",
      description: t.tunanDesc,
      longDescription: t.tunanLong,
      category: "air-terjun",
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=800",
      ticketPrice: 10000,
      facilities: t.tunanFacilities,
      distanceFromAirport: t.tunanDistance,
      bestTime: t.tunanBestTime,
    },
    {
      id: "agro",
      name: lang === "la" ? "Cultus Coprae" : lang === "zh" ? "椰子工坊与椰干" : lang === "ko" ? "코코넛 농장 & 야자 수확" : lang === "vi" ? "Nông Nghiệp Dừa & Dừa Khô" : lang === "en" ? "Coconut & Copra Farm" : "Agrowisata Kelapa & Kopra",
      description: t.agroDesc,
      longDescription: t.agroLong,
      category: "edukasi",
      image: "https://images.unsplash.com/photo-1543157145-f78c636f023d?auto=format&fit=crop&q=80&w=800",
      ticketPrice: 15000,
      facilities: t.agroFacilities,
      distanceFromAirport: t.agroDistance,
      bestTime: t.agroBestTime,
    },
    {
      id: "kali",
      name: lang === "la" ? "Cataracta Kali" : lang === "zh" ? "卡里隐秘瀑布" : lang === "ko" ? "칼리 폭포" : lang === "vi" ? "Thác Kali" : lang === "en" ? "Kali Waterfall" : "Air Terjun Kali",
      description: t.kaliDesc,
      longDescription: t.kaliLong,
      category: "air-terjun",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=800",
      ticketPrice: 5000,
      facilities: t.kaliFacilities,
      distanceFromAirport: t.kaliDistance,
      bestTime: t.kaliBestTime,
    },
  ];

  // Price calculations
  const TICKET_PRICE = selectedSpot === "tunan" ? 10000 : selectedSpot === "agro" ? 15000 : 5000;
  const ESTIM_TICKETS = TICKET_PRICE * groupSize;
  const ESTIM_TRANSPORT = transportType === "motor" ? 75000 : transportType === "car" ? 350000 : 0;
  const ESTIM_GAZEBO = rentGazebo ? 30000 : 0;
  const ESTIM_GUIDE = needGuide ? 100000 : 0;
  const ESTIM_FOOD = foodPackage ? 25000 * groupSize : 0;
  const TOTAL_ESTIMATE = ESTIM_TICKETS + ESTIM_TRANSPORT + ESTIM_GAZEBO + ESTIM_GUIDE + ESTIM_FOOD;

  const currentSpot = spots.find((s) => s.id === selectedSpot) || spots[0];

  return (
    <div id="section-wisata" className="bg-sand-100 py-16 sm:py-20 border-t border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="bg-forest-100 inline-flex p-2.5 rounded-2xl text-forest-700 shadow-inner">
            <Compass className="h-6 w-6 animate-spin" />
          </div>
          <span className="block font-mono text-xs uppercase tracking-widest font-bold text-gold-600">
            {t.wisataBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold">
            {t.wisataTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-gray-600">
            {t.wisataSubtitle}
          </p>
        </div>

        {/* Sights Select & Spot Details Panel */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Grid: Spot selection list */}
          <div className="lg:col-span-5 space-y-4">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 font-mono">
              {t.selectDestLabel}
            </span>

            {spots.map((spot) => {
              const active = spot.id === selectedSpot;
              return (
                <button
                  key={spot.id}
                  id={`spot-tab-${spot.id}`}
                  onClick={() => setSelectedSpot(spot.id)}
                  className={`w-full text-left p-5 rounded-3xl transition-all duration-300 border flex space-x-4 items-center ${
                    active
                      ? "bg-white border-forest-600 shadow-md transform translate-x-1"
                      : "bg-sand-50 hover:bg-white border-sand-200 hover:shadow-sm"
                  }`}
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="grow">
                    <h4 className="font-serif text-lg font-bold text-gray-900 group-hover:text-forest-600">
                      {spot.name}
                    </h4>
                    <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                      {spot.description}
                    </p>
                    <div className="flex items-center space-x-1 mt-2 text-forest-700 text-xs font-semibold font-mono">
                      <span>Rp {spot.ticketPrice.toLocaleString("id-ID")}</span>
                      <span>•</span>
                      <span className="flex items-center"><MapPin className="h-3 w-3 mr-0.5" />{spot.distanceFromAirport}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Grid: Detailed Active Spot View */}
          <div className="lg:col-span-7" id="spot-detail-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSpot}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-4xl overflow-hidden border border-sand-100 shadow-xl"
              >
                {/* Large Cover */}
                <div className="h-80 relative">
                  <img
                    src={currentSpot.image}
                    alt={currentSpot.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/10 to-transparent flex items-end p-8">
                    <div>
                      <span className="bg-gold-500 text-sand-50 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                        {currentSpot.category.toUpperCase()}
                      </span>
                      <h3 className="font-serif text-3xl text-white font-bold mt-2">
                        {currentSpot.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-8 space-y-6">
                  <div>
                    <h5 className="font-mono text-xs font-bold text-gold-600 uppercase tracking-widest">
                      {t.deepReviewLabel}
                    </h5>
                    <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
                      {currentSpot.longDescription}
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 bg-sand-50 p-6 rounded-3xl border border-sand-200">
                    <div>
                      <h6 className="font-display text-xs font-bold text-forest-800 uppercase tracking-wider">
                        {t.bestTimeLabel}
                      </h6>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {currentSpot.bestTime}
                      </p>
                    </div>
                    <div>
                      <h6 className="font-display text-xs font-bold text-forest-800 uppercase tracking-wider">
                        {t.airportConveyLabel}
                      </h6>
                      <p className="text-xs text-gray-500 mt-1">
                        {t.airportConveyText}
                        <strong className="text-forest-700">
                          {currentSpot.distanceFromAirport}
                        </strong>
                        {t.airportConveyUnit}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-mono text-xs font-bold text-gold-600 uppercase tracking-widest mb-3">
                      {t.amenitiesLabel}
                    </h5>
                    <div className="flex flex-wrap gap-2.5">
                      {currentSpot.facilities.map((fac, i) => (
                        <span
                          key={i}
                          className="flex items-center text-xs bg-forest-50 text-forest-800 rounded-full py-1.5 px-3.5 border border-forest-100 font-medium"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-forest-600 mr-1.5" />
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Cost Estimator Dashboard Section */}
        <div id="trip-calculator-panel" className="mt-20 bg-white border border-sand-200 rounded-4xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
            <Compass className="h-40 w-40" />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Input fields */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gold-50 text-gold-700 text-[10px] font-bold uppercase tracking-wider mb-2">
                  <Wallet className="h-3 w-3 mr-1" />
                  {t.calcBadge}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
                  {t.calcTitle}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  {t.calcSubtitle}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-2">
                {/* Group size */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2 font-mono">
                    {t.groupSizeLabel}
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      id="calc-group-dec"
                      type="button"
                      disabled={groupSize <= 1}
                      onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                      className="bg-sand-100 hover:bg-sand-200 font-bold border border-sand-300 rounded-xl px-4 py-2 text-sm disabled:opacity-40"
                    >
                      -
                    </button>
                    <span id="calc-group-display" className="grow text-center text-base font-semibold border-b border-sand-300 pb-1">
                      {groupSize} {t.groupPaxUnit}
                    </span>
                    <button
                      id="calc-group-inc"
                      type="button"
                      onClick={() => setGroupSize(groupSize + 1)}
                      className="bg-sand-100 hover:bg-sand-200 font-bold border border-sand-300 rounded-xl px-4 py-2 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Transport */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-widest mb-2 font-mono">
                    {t.transLabel}
                  </label>
                  <select
                    id="calc-transport-select"
                    value={transportType}
                    onChange={(e: any) => setTransportType(e.target.value)}
                    className="w-full bg-sand-50 hover:bg-white border border-sand-300 rounded-xl px-4 py-2.5 text-xs font-semibold cursor-pointer"
                  >
                    <option value="none">{t.transOwn}</option>
                    <option value="motor">{t.transMotor}</option>
                    <option value="car">{t.transCar}</option>
                  </select>
                </div>
              </div>

              {/* Toggle upgrades */}
              <div className="space-y-3.5 pt-4 border-t border-sand-100">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-widest font-mono">
                  {t.addonsLabel}
                </span>

                <div className="grid sm:grid-cols-3 gap-4 font-semibold text-xs text-gray-700">
                  {/* Gazebo */}
                  <label
                    id="label-calc-gazebo"
                    className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      rentGazebo 
                        ? "bg-forest-50/60 border-forest-600/30 font-semibold text-forest-800" 
                        : "bg-sand-50/50 border-sand-200 text-gray-600 hover:bg-sand-50"
                    }`}
                  >
                    <input
                      id="checkbox-calc-gazebo"
                      type="checkbox"
                      checked={rentGazebo}
                      onChange={(e) => setRentGazebo(e.target.checked)}
                      className="rounded accent-forest-600 h-4 w-4 shrink-0"
                    />
                    <div className="text-left">
                      <span className="block text-xs">{t.gazeboLabel}</span>
                      <span className="block text-[10px] text-gray-400 leading-none mt-0.5">Rp 30.000</span>
                    </div>
                  </label>

                  {/* Local guide */}
                  <label
                    id="label-calc-guide"
                    className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      needGuide 
                        ? "bg-forest-50/60 border-forest-600/30 font-semibold text-forest-800" 
                        : "bg-sand-50/50 border-sand-200 text-gray-600 hover:bg-sand-50"
                    }`}
                  >
                    <input
                      id="checkbox-calc-guide"
                      type="checkbox"
                      checked={needGuide}
                      onChange={(e) => setNeedGuide(e.target.checked)}
                      className="rounded accent-forest-600 h-4 w-4 shrink-0"
                    />
                    <div className="text-left">
                      <span className="block text-xs">{t.guideLabel}</span>
                      <span className="block text-[10px] text-gray-400 leading-none mt-0.5">Rp 100.000</span>
                    </div>
                  </label>

                  {/* Food Package */}
                  <label
                    id="label-calc-food"
                    className={`flex items-center space-x-3 p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      foodPackage 
                        ? "bg-forest-50/60 border-forest-600/30 font-semibold text-forest-800" 
                        : "bg-sand-50/50 border-sand-200 text-gray-600 hover:bg-sand-50"
                    }`}
                  >
                    <input
                      id="checkbox-calc-food"
                      type="checkbox"
                      checked={foodPackage}
                      onChange={(e) => setFoodPackage(e.target.checked)}
                      className="rounded accent-forest-600 h-4 w-4 shrink-0"
                    />
                    <div className="text-left">
                      <span className="block text-xs">{t.foodLabel}</span>
                      <span className="block text-[10px] text-gray-400 leading-none mt-0.5">Rp 25k / pax</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Estimator Bill Display */}
            <div className="lg:col-span-5 bg-sand-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-sand-300">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest block font-mono border-b border-sand-300 pb-2 mb-4">
                  {t.billTitle}
                </span>

                <div className="space-y-3 text-xs text-gray-600 font-semibold">
                  <div className="flex justify-between">
                    <span>
                      {t.billEntrance} ({groupSize} x Rp {TICKET_PRICE.toLocaleString("id")})
                    </span>
                    <span className="font-mono font-medium">Rp {ESTIM_TICKETS.toLocaleString("id-ID")}</span>
                  </div>

                  {ESTIM_TRANSPORT > 0 && (
                    <div className="flex justify-between">
                      <span>{t.billTransport}</span>
                      <span className="font-mono font-medium">Rp {ESTIM_TRANSPORT.toLocaleString("id-ID")}</span>
                    </div>
                  )}

                  {ESTIM_GAZEBO > 0 && (
                    <div className="flex justify-between">
                      <span>{t.billGazebo}</span>
                      <span className="font-mono font-medium">Rp {ESTIM_GAZEBO.toLocaleString("id-ID")}</span>
                    </div>
                  )}

                  {ESTIM_GUIDE > 0 && (
                    <div className="flex justify-between">
                      <span>{t.billGuide}</span>
                      <span className="font-mono font-medium">Rp {ESTIM_GUIDE.toLocaleString("id-ID")}</span>
                    </div>
                  )}

                  {ESTIM_FOOD > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {t.billFood} ({groupSize} x Rp 25.000)
                      </span>
                      <span className="font-mono font-medium">Rp {ESTIM_FOOD.toLocaleString("id-ID")}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Tag */}
              <div className="mt-8 pt-4 border-t border-sand-300 border-dashed">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs font-semibold uppercase text-gray-700 tracking-wider">
                    {t.billTotal}
                  </span>
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-forest-700 font-mono">
                    Rp {TOTAL_ESTIMATE.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="bg-forest-100 p-4 rounded-2xl flex items-start space-x-2.5">
                  <Info className="h-4 w-4 text-forest-700 shrink-0 mt-0.5" />
                  <span className="text-[10px] sm:text-xs text-forest-800 leading-relaxed font-semibold">
                    {t.billTip}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
