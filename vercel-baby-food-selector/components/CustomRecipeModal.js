import React, { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const CustomRecipeModal = ({ isOpen, onClose, onSave, availableIngredients }) => {
  const [recipeName, setRecipeName] = useState('');
  const [calories, setCalories] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [steps, setSteps] = useState(['']);
  
  // 重置表单
  const resetForm = () => {
    setRecipeName('');
    setCalories('');
    setCookingTime('');
    setSteps(['']);
  };
  
  // 添加步骤
  const addStep = () => {
    setSteps([...steps, '']);
  };
  
  // 更新步骤
  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };
  
  // 删除步骤
  const removeStep = (index) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };
  
  // 保存自定义菜谱
  const handleSave = () => {
    // 验证输入
    if (!recipeName.trim() || !calories || !cookingTime || steps.some(step => !step.trim())) {
      alert('请填写所有必填字段');
      return;
    }
    
    // 创建自定义菜谱对象
    const customRecipe = {
      name: recipeName.trim(),
      calories: parseInt(calories),
      cookingTime: parseInt(cookingTime),
      ingredients: {
        available: [...availableIngredients],
        toBuy: []
      },
      steps: steps.filter(step => step.trim()),
      nutrition: {
        protein: '未知',
        fat: '未知',
        carbs: '未知'
      }
    };
    
    // 调用保存回调
    onSave(customRecipe);
    
    // 重置表单并关闭模态框
    resetForm();
    onClose();
  };
  
  // 关闭模态框
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl w-full max-w-lg animate-slide-up">
        {/* 模态框头部 */}
        <div className="bg-primary text-white p-4 rounded-t-xl flex justify-between items-center">
          <h3 className="text-lg font-bold">添加自定义菜谱</h3>
          <button 
            className="text-white hover:text-gray-200"
            onClick={handleClose}
          >
            <FaTimes />
          </button>
        </div>
        
        {/* 模态框内容 */}
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {/* 菜谱名称 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">菜谱名称</label>
            <input
              type="text"
              className="input-field"
              placeholder="例如：香煎三文鱼"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>
          
          {/* 卡路里和烹饪时间 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">卡路里</label>
              <input
                type="number"
                className="input-field"
                placeholder="例如：350"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">烹饪时间（分钟）</label>
              <input
                type="number"
                className="input-field"
                placeholder="例如：20"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />
            </div>
          </div>
          
          {/* 已选食材 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">使用的食材</label>
            <div className="bg-secondary bg-opacity-30 p-3 rounded-lg">
              {availableIngredients.length === 0 ? (
                <p className="text-gray-500">未选择任何食材</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableIngredients.map((ing, idx) => (
                    <span key={idx} className="tag">
                      {ing}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* 烹饪步骤 */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">烹饪步骤</label>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                  {index + 1}
                </div>
                <input
                  type="text"
                  className="input-field flex-grow"
                  placeholder={`步骤 ${index + 1}`}
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                />
                <button
                  className="ml-2 text-error hover:text-opacity-80"
                  onClick={() => removeStep(index)}
                  disabled={steps.length <= 1}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              className="flex items-center text-primary hover:text-opacity-80 mt-2"
              onClick={addStep}
            >
              <FaPlus className="mr-1" /> 添加步骤
            </button>
          </div>
        </div>
        
        {/* 模态框底部 */}
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button 
            className="btn-secondary"
            onClick={handleClose}
          >
            取消
          </button>
          <button 
            className="btn-primary"
            onClick={handleSave}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomRecipeModal;
