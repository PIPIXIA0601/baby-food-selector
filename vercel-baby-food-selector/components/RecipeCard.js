import React from 'react';
import { FaCheck, FaClock, FaFire } from 'react-icons/fa';

const RecipeCard = ({ recipe, onSelect, isSelected }) => {
  return (
    <div className="card overflow-hidden transition-all hover:shadow-lg">
      {/* 卡片头部 */}
      <div className="border-b border-secondary pb-3 mb-3">
        <h3 className="text-lg font-bold text-primary">{recipe.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <div className="flex items-center mr-4">
            <FaFire className="text-warning mr-1" />
            <span>{recipe.calories} 卡路里</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-gray-400 mr-1" />
            <span>{recipe.cookingTime} 分钟</span>
          </div>
        </div>
      </div>
      
      {/* 食材部分 */}
      <div className="mb-4">
        <h4 className="font-medium text-primary mb-2">食材</h4>
        <ul className="pl-5 text-sm">
          {recipe.ingredients.available.map((ing, idx) => (
            <li key={`available-${idx}`} className="mb-1 flex items-start">
              <span className="text-success mr-2">✓</span>
              <span>{ing} <span className="text-success">(已有)</span></span>
            </li>
          ))}
          {recipe.ingredients.toBuy.map((ing, idx) => (
            <li key={`tobuy-${idx}`} className="mb-1 flex items-start">
              <span className="text-warning mr-2">+</span>
              <span>{ing} <span className="text-warning">(需购买)</span></span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* 步骤部分 */}
      <div className="mb-4">
        <h4 className="font-medium text-primary mb-2">烹饪步骤</h4>
        <ol className="pl-5 text-sm">
          {recipe.steps.map((step, idx) => (
            <li key={idx} className="mb-1">{step}</li>
          ))}
        </ol>
      </div>
      
      {/* 营养信息 */}
      <div className="bg-secondary rounded-lg p-3 mb-4">
        <h4 className="font-medium text-primary mb-2 text-center">营养成分</h4>
        <div className="flex justify-around text-sm">
          <div className="text-center">
            <div className="font-bold text-primary">{recipe.nutrition.protein}</div>
            <div>蛋白质</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-primary">{recipe.nutrition.fat}</div>
            <div>脂肪</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-primary">{recipe.nutrition.carbs}</div>
            <div>碳水</div>
          </div>
        </div>
      </div>
      
      {/* 选择按钮 */}
      <button 
        className={`w-full py-2 rounded-lg transition-all ${
          isSelected 
            ? 'bg-success text-white' 
            : 'bg-primary text-white'
        }`}
        onClick={() => onSelect(recipe)}
      >
        {isSelected ? (
          <span className="flex items-center justify-center">
            <FaCheck className="mr-1" /> 已选择
          </span>
        ) : '选择此菜谱'}
      </button>
    </div>
  );
};

export default RecipeCard;
