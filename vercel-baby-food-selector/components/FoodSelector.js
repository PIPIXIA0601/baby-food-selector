import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const foodCategories = [
  { id: 'vegetables', name: '蔬菜' },
  { id: 'meat', name: '肉类' },
  { id: 'seafood', name: '海鲜' },
  { id: 'dairy', name: '奶制品' },
  { id: 'grains', name: '主食' },
  { id: 'condiments', name: '调料' },
];

const foodsData = {
  vegetables: [
    { name: '番茄', icon: '🍅' },
    { name: '土豆', icon: '🥔' },
    { name: '胡萝卜', icon: '🥕' },
    { name: '洋葱', icon: '🧅' },
    { name: '青椒', icon: '🫑' },
    { name: '黄瓜', icon: '🥒' },
    { name: '茄子', icon: '🍆' },
    { name: '白菜', icon: '🥬' },
    { name: '菠菜', icon: '🍃' }
  ],
  meat: [
    { name: '鸡肉', icon: '🍗' },
    { name: '牛肉', icon: '🥩' },
    { name: '猪肉', icon: '🥓' },
    { name: '羊肉', icon: '🍖' },
    { name: '火腿', icon: '🍖' },
    { name: '香肠', icon: '🌭' }
  ],
  seafood: [
    { name: '鱼', icon: '🐟' },
    { name: '虾', icon: '🦐' },
    { name: '蟹', icon: '🦀' },
    { name: '贝类', icon: '🦪' },
    { name: '鱿鱼', icon: '🦑' }
  ],
  dairy: [
    { name: '牛奶', icon: '🥛' },
    { name: '奶酪', icon: '🧀' },
    { name: '黄油', icon: '🧈' },
    { name: '酸奶', icon: '🥣' },
    { name: '鸡蛋', icon: '🥚' }
  ],
  grains: [
    { name: '米饭', icon: '🍚' },
    { name: '面条', icon: '🍜' },
    { name: '面包', icon: '🍞' },
    { name: '燕麦', icon: '🌾' },
    { name: '玉米', icon: '🌽' }
  ],
  condiments: [
    { name: '盐', icon: '🧂' },
    { name: '糖', icon: '🍬' },
    { name: '醋', icon: '🍶' },
    { name: '酱油', icon: '🍯' },
    { name: '辣椒', icon: '🌶️' },
    { name: '大蒜', icon: '🧄' },
    { name: '姜', icon: '🌱' }
  ]
};

// 创建粒子动画效果
const createParticleEffect = (sourceX, sourceY, targetX, targetY) => {
  // 创建多个粒子
  const particleCount = 8;
  
  for (let i = 0; i < particleCount; i++) {
    // 创建粒子元素
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机粒子大小
    const size = Math.floor(Math.random() * 6) + 4; // 4-10px
    
    // 随机动画持续时间
    const duration = Math.random() * 0.5 + 0.5; // 0.5-1s
    
    // 随机起始位置偏移
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    
    // 设置粒子样式
    particle.style.setProperty('--size', `${size}px`);
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--start-x', `${sourceX + offsetX}px`);
    particle.style.setProperty('--start-y', `${sourceY + offsetY}px`);
    particle.style.setProperty('--end-x', `${targetX}px`);
    particle.style.setProperty('--end-y', `${targetY}px`);
    
    // 设置粒子初始位置
    particle.style.left = `${sourceX + offsetX}px`;
    particle.style.top = `${sourceY + offsetY}px`;
    
    // 添加到文档
    document.body.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
      document.body.removeChild(particle);
    }, duration * 1000);
  }
};

const FoodSelector = ({ onSelectIngredients }) => {
  const [activeCategory, setActiveCategory] = useState('vegetables');
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [customFood, setCustomFood] = useState('');
  
  // 切换食材分类
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // 切换食材选择状态
  const toggleFoodSelection = (foodName, event) => {
    setSelectedFoods(prev => {
      const isSelected = prev.includes(foodName);
      
      if (!isSelected && event) {
        // 创建粒子动画效果
        const rect = event.currentTarget.getBoundingClientRect();
        const sourceX = rect.left + rect.width / 2;
        const sourceY = rect.top + rect.height / 2;
        
        // 目标位置（已选食材列表）
        const targetElement = document.getElementById('selected-foods-list');
        if (targetElement) {
          const targetRect = targetElement.getBoundingClientRect();
          const targetX = targetRect.left + targetRect.width / 2;
          const targetY = targetRect.top + targetRect.height / 2;
          
          createParticleEffect(sourceX, sourceY, targetX, targetY);
        }
        
        return [...prev, foodName];
      } else {
        return prev.filter(item => item !== foodName);
      }
    });
  };
  
  // 添加自定义食材
  const handleAddCustomFood = () => {
    if (customFood.trim() && !selectedFoods.includes(customFood.trim())) {
      setSelectedFoods(prev => [...prev, customFood.trim()]);
      setCustomFood('');
      
      // 创建粒子动画效果
      const inputElement = document.getElementById('custom-food-input');
      if (inputElement) {
        const rect = inputElement.getBoundingClientRect();
        const sourceX = rect.left + rect.width / 2;
        const sourceY = rect.top + rect.height / 2;
        
        // 目标位置（已选食材列表）
        const targetElement = document.getElementById('selected-foods-list');
        if (targetElement) {
          const targetRect = targetElement.getBoundingClientRect();
          const targetX = targetRect.left + targetRect.width / 2;
          const targetY = targetRect.top + targetRect.height / 2;
          
          createParticleEffect(sourceX, sourceY, targetX, targetY);
        }
      }
    }
  };
  
  // 移除已选食材
  const removeSelectedFood = (foodName) => {
    setSelectedFoods(prev => prev.filter(item => item !== foodName));
  };
  
  // 获取菜谱推荐
  const handleGetRecommendations = () => {
    if (selectedFoods.length > 0) {
      onSelectIngredients(selectedFoods);
    } else {
      alert('请至少选择一种食材');
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-primary mb-2">选择冰箱中的食材</h2>
        <p className="text-gray-600">告诉我你有什么食材，我来推荐美味菜谱</p>
      </div>
      
      {/* 食材分类 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {foodCategories.map(category => (
          <button
            key={category.id}
            className={`px-3 py-2 rounded-full text-sm ${
              activeCategory === category.id 
                ? 'bg-primary text-white' 
                : 'bg-secondary text-dark'
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 食材网格 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6">
        {foodsData[activeCategory]?.map((food, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
              selectedFoods.includes(food.name) 
                ? 'bg-primary text-white' 
                : 'bg-white text-dark shadow'
            }`}
            onClick={(e) => toggleFoodSelection(food.name, e)}
          >
            <div className="text-2xl mb-1">{food.icon}</div>
            <div className="text-sm">{food.name}</div>
          </div>
        ))}
      </div>
      
      {/* 自定义食材输入 */}
      <div className="flex mb-6">
        <input
          id="custom-food-input"
          type="text"
          className="input-field flex-grow"
          placeholder="添加其他食材..."
          value={customFood}
          onChange={(e) => setCustomFood(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCustomFood()}
        />
        <button 
          className="ml-2 bg-primary text-white px-4 rounded-lg"
          onClick={handleAddCustomFood}
        >
          添加
        </button>
      </div>
      
      {/* 已选食材 */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-primary mb-3">已选食材</h3>
        <div id="selected-foods-list" className="flex flex-wrap gap-2">
          {selectedFoods.length === 0 ? (
            <p className="text-gray-400">还没有选择食材</p>
          ) : (
            selectedFoods.map((food, index) => {
              // 查找食材图标
              let foodIcon = '';
              for (const category in foodsData) {
                const found = foodsData[category].find(item => item.name === food);
                if (found) {
                  foodIcon = found.icon;
                  break;
                }
              }
              
              return (
                <div key={index} className="tag-selected px-3 py-1 rounded-full flex items-center">
                  {foodIcon && <span className="mr-1">{foodIcon}</span>}
                  {food}
                  <button 
                    className="ml-2 text-white opacity-80 hover:opacity-100"
                    onClick={() => removeSelectedFood(food)}
                  >
                    ×
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* 获取推荐按钮 */}
      <button 
        className="btn-primary w-full py-3 text-lg font-medium"
        onClick={handleGetRecommendations}
      >
        获取菜谱推荐
      </button>
    </div>
  );
};

export default FoodSelector;
