import React, { useState } from 'react';
import { FaArrowLeft, FaShare, FaClipboard, FaCheck } from 'react-icons/fa';

const RecipeDecision = ({ selectedRecipes, onBack, onReset }) => {
  const [copied, setCopied] = useState(false);
  
  // 生成分享链接
  const generateShareUrl = () => {
    // 在实际应用中，这里应该生成一个唯一的ID并保存菜单数据
    // 这里简单模拟一个分享链接
    const shareId = Date.now().toString(36);
    return `${window.location.origin}?share=${shareId}`;
  };
  
  // 复制分享链接
  const copyShareUrl = () => {
    const shareUrl = generateShareUrl();
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('无法复制链接: ', err);
        alert('复制链接失败，请手动复制');
      });
  };
  
  // 收集所有食材
  const collectIngredients = () => {
    const available = new Set();
    const toBuy = new Set();
    
    selectedRecipes.forEach(recipe => {
      recipe.ingredients.available.forEach(ing => available.add(ing));
      recipe.ingredients.toBuy.forEach(ing => toBuy.add(ing));
    });
    
    return {
      available: Array.from(available),
      toBuy: Array.from(toBuy)
    };
  };
  
  const ingredients = collectIngredients();
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">今日菜单</h2>
        <p className="text-gray-600">您的最终菜单已生成</p>
      </div>
      
      {/* 最终菜单 */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-secondary">
          精选菜谱
        </h3>
        
        <div className="space-y-4">
          {selectedRecipes.map((recipe, index) => (
            <div key={index} className="pb-3 border-b border-secondary last:border-b-0 last:pb-0">
              <h4 className="font-medium">{recipe.name}</h4>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <span className="mr-3">{recipe.calories} 卡路里</span>
                <span>烹饪时间: {recipe.cookingTime} 分钟</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 采购清单 */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-primary mb-4">采购清单</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-primary mb-2 pb-1 border-b border-secondary">
              已有食材
            </h4>
            {ingredients.available.length === 0 ? (
              <p className="text-gray-400">无</p>
            ) : (
              <ul className="pl-5 list-disc">
                {ingredients.available.map((ing, idx) => (
                  <li key={idx} className="mb-1">{ing}</li>
                ))}
              </ul>
            )}
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2 pb-1 border-b border-secondary">
              需要购买
            </h4>
            {ingredients.toBuy.length === 0 ? (
              <p className="text-gray-400">无</p>
            ) : (
              <ul className="pl-5 list-disc">
                {ingredients.toBuy.map((ing, idx) => (
                  <li key={idx} className="mb-1">{ing}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* 分享部分 */}
      <div className="card mb-6">
        <h3 className="text-lg font-bold text-primary mb-2 flex items-center">
          <FaShare className="mr-2" /> 分享给另一半
        </h3>
        <p className="text-gray-600 mb-3">复制下面的链接分享给TA</p>
        
        <div className="flex">
          <input
            type="text"
            className="input-field flex-grow"
            value={generateShareUrl()}
            readOnly
          />
          <button 
            className="ml-2 bg-primary text-white px-4 rounded-lg flex items-center"
            onClick={copyShareUrl}
          >
            {copied ? <FaCheck className="mr-1" /> : <FaClipboard className="mr-1" />}
            {copied ? '已复制' : '复制'}
          </button>
        </div>
        
        {copied && (
          <p className="text-success text-sm mt-2">链接已复制到剪贴板！</p>
        )}
      </div>
      
      {/* 操作按钮 */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          className="btn-secondary flex items-center justify-center"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2" /> 返回推荐
        </button>
        <button 
          className="btn-primary"
          onClick={onReset}
        >
          重新开始
        </button>
      </div>
    </div>
  );
};

export default RecipeDecision;
