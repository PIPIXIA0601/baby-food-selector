import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredients } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Invalid ingredients data' });
    }

    // DeepSeek API配置
    const apiKey = 'sk-bjycxopygdghrgkutfezpgwxukfnfbyluxrzksefjmmbhyjx';
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions';

    // 构建提示词
    const prompt = `作为一个专业的厨师，请根据以下食材推荐3-5道健康低脂的菜谱（每道菜卡路里<500/人份，烹饪步骤≤5步）。
食材列表: ${ingredients.join(', ')}

请按以下JSON格式返回结果，不要有任何其他文字:
{
  "recipes": [
    {
      "name": "菜谱名称",
      "calories": 卡路里数值(整数),
      "cookingTime": 烹饪时间(分钟,整数),
      "ingredients": {
        "available": ["已有食材1", "已有食材2"],
        "toBuy": ["需购买食材1", "需购买食材2"]
      },
      "steps": ["步骤1", "步骤2", "步骤3"],
      "nutrition": {
        "protein": "蛋白质含量",
        "fat": "脂肪含量",
        "carbs": "碳水含量"
      }
    }
  ]
}`;

    // 调用DeepSeek API
    const response = await axios.post(
      apiUrl,
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // 解析API响应
    const content = response.data.choices[0].message.content;
    
    // 尝试提取JSON
    try {
      // 查找JSON开始的位置
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      const jsonStr = content.substring(jsonStart, jsonEnd);
      
      const recipes = JSON.parse(jsonStr);
      return res.status(200).json(recipes);
    } catch (jsonError) {
      console.error('JSON解析错误:', jsonError);
      // 如果JSON解析失败，返回原始内容
      return res.status(200).json({ rawContent: content });
    }
  } catch (error) {
    console.error('API调用错误:', error.response?.data || error.message);
    return res.status(500).json({ 
      error: 'Failed to get recommendations',
      details: error.response?.data || error.message
    });
  }
}
