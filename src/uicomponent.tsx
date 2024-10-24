import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  checked: boolean;
  label: string; // New label property
}

interface ChecklistLevel {
  tasks: Task[];
  completed: number;
}

interface ChecklistData {
  [key: number]: ChecklistLevel;
}

const UXMaturityChecklist = () => {
  const [checklistData, setChecklistData] = useState<ChecklistData>({
    1: {
      tasks: [
        { id: '1-1', text: 'UX kavramlarını öğrenme', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '1-2', text: 'Temel kullanıcı ihtiyaçlarını belirleme', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '1-3', text: 'UX araştırma metodlarını öğrenme', checked: false, label: 'Kullanıcı Araştırma' },
      ],
      completed: 0,
    },
    2: {
      tasks: [
        { id: '2-1', text: 'Basit kullanıcı görüşmeleri yapma', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '2-2', text: 'Temel tasarım prensiplerini uygulama', checked: false, label: 'Tasarım Sistemi' },
        { id: '2-3', text: 'Kullanıcı personaları oluşturma', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '2-4', text: 'Basit prototipleme çalışmaları', checked: false, label: 'Tasarım Sistemi' },
      ],
      completed: 0,
    },
    3: {
      tasks: [
        { id: '3-1', text: 'Düzenli kullanıcı testleri yapma', checked: false, label: 'Test & Ölçüm' },
        { id: '3-2', text: 'Veri odaklı kararlar alma', checked: false, label: 'Test & Ölçüm' },
        { id: '3-3', text: 'Design system temelleri', checked: false, label: 'Tasarım Sistemi' },
        { id: '3-4', text: 'UX metrikleri belirleme', checked: false, label: 'Test & Ölçüm' },
        { id: '3-5', text: 'Düzenli ekip toplantıları', checked: false, label: 'Süreç Yönetimi' },
      ],
      completed: 0,
    },
    4: {
      tasks: [
        { id: '4-1', text: 'Kapsamlı UX araştırma planı', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '4-2', text: 'A/B testleri uygulama', checked: false, label: 'Test & Ölçüm' },
        { id: '4-3', text: 'Kullanıcı yolculuğu haritaları', checked: false, label: 'Tasarım Sistemi' },
        { id: '4-4', text: 'Design system dokümantasyonu', checked: false, label: 'Tasarım Sistemi' },
        { id: '4-5', text: 'UX süreç dokümantasyonu', checked: false, label: 'Süreç Yönetimi' },
      ],
      completed: 0,
    },
    5: {
      tasks: [
        { id: '5-1', text: 'Çok kanallı kullanıcı araştırması', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '5-2', text: 'Otomatik test sistemleri', checked: false, label: 'Test & Ölçüm' },
        { id: '5-3', text: 'Sürekli kullanıcı geri bildirimi', checked: false, label: 'Kullanıcı Araştırma' },
        { id: '5-4', text: 'UX KPI takibi', checked: false, label: 'Test & Ölçüm' },
        { id: '5-5', text: 'Cross-functional ekip entegrasyonu', checked: false, label: 'Ekip Yetkinliği' },
      ],
      completed: 0,
    },
    6: {
      tasks: [
        { id: '6-1', text: 'Kullanıcı odaklı inovasyon süreci', checked: false, label: 'İnovasyon' },
        { id: '6-2', text: 'İleri düzey veri analitiği', checked: false, label: 'İnovasyon' },
        { id: '6-3', text: 'UX stratejisi ve vizyonu', checked: false, label: 'İnovasyon' },
        { id: '6-4', text: 'Sürekli iyileştirme kültürü', checked: false, label: 'İnovasyon' },
        { id: '6-5', text: 'Global UX standartları', checked: false, label: 'İnovasyon' },
      ],
      completed: 0,
    },
  });

  const [maturityData, setMaturityData] = useState([
    { subject: 'Kullanıcı Araştırma', A: 1, fullMark: 6, label:'Kullanıcı Araştırma' },
    { subject: 'Tasarım Sistemi', A: 1, fullMark: 6, label:'Tasarım Sistemi' },
    { subject: 'Test & Ölçüm', A: 1, fullMark: 6, label:'Test & Ölçüm' },
    { subject: 'Süreç Yönetimi', A: 1, fullMark: 6, label:'Süreç Yönetimi' },
    { subject: 'Ekip Yetkinliği', A: 1, fullMark: 6, label:'Ekip Yetkinliği' },
    { subject: 'İnovasyon', A: 1, fullMark: 6, label:'İnovasyon' },
  ]);

  const [rioData, setRioData] = useState([
    { phase: 'Research', completed: 0, target: 100 },
    { phase: 'Ideation', completed: 0, target: 100 },
    { phase: 'Output', completed: 0, target: 100 },
  ]);

  const handleCheckboxChange = (levelId: number, taskId: string) => {
    const newData: ChecklistData = { ...checklistData };
    const taskIndex = newData[levelId].tasks.findIndex(
      (task) => task.id === taskId
    );
    newData[levelId].tasks[taskIndex].checked =
      !newData[levelId].tasks[taskIndex].checked;

    // Calculate completion percentage for the level
    const totalTasks = newData[levelId].tasks.length;
    const completedTasks = newData[levelId].tasks.filter(
      (task) => task.checked
    ).length;
    newData[levelId].completed = (completedTasks / totalTasks) * 100;

    setChecklistData(newData);
    updateCharts(newData);
  };

  const updateCharts = (data: ChecklistData) => {
    // Update Radar Chart
    const newMaturityData = maturityData.map((item) => ({
      ...item,
      A: calculateMaturityLevel(data)[item.subject] || 0,
    }));
    setMaturityData(newMaturityData);

    // Update RIO Chart
    const newRioData = rioData.map((item) => ({
      ...item,
      completed: calculateRioCompletion(data, item.phase),
    }));
    setRioData(newRioData);
  };

  const calculateMaturityLevel = (data: ChecklistData) => {
    const labelCompletion: { [label: string]: number[] } = {};

    // Aggregate completion percentages by label
    for (let level in data) {
      data[level].tasks.forEach((task) => {
        if (!labelCompletion[task.label]) {
          labelCompletion[task.label] = [];
        }
        labelCompletion[task.label].push(data[level].completed);
      });
    }

    // Calculate average completion for each label
    const labelAverages: { [label: string]: number } = {};
    for (let label in labelCompletion) {
      const total = labelCompletion[label].reduce((sum, value) => sum + value, 0);
      labelAverages[label] = total / labelCompletion[label].length;
    }

    return labelAverages;
  };

  const calculateRioCompletion = (data: ChecklistData, phase: string) => {
    // Map phases to relevant level ranges
    const phaseRanges: { [key: string]: [number, number] } = {
      Research: [1, 2],
      Ideation: [3, 4],
      Output: [5, 6],
    };

    const [startLevel, endLevel] = phaseRanges[phase];
    let phaseCompletion = 0;

    for (let i = startLevel; i <= endLevel; i++) {
      phaseCompletion += data[i].completed;
    }

    return phaseCompletion / 2; // Average of the two levels
  };

  return (
    <Card className="w-full p-6">
      <CardHeader>
        <CardTitle className="text-2xl mb-4">
          UX Olgunluk Kontrol Listesi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">UX Olgunluk Düzeyi</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={maturityData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Mevcut Seviye"
                  dataKey="A"
                  stroke="#4f46e5"
                  fill="#4f46e5"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* RIO Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">RIO İlerleme Durumu</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rioData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="phase" type="category" width={70}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4f46e5" name="Tamamlanan" />
                <Bar dataKey="target" fill="#e5e7eb" name="Hedef" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-8">
          {Object.entries(checklistData).map(
            ([level, { tasks, completed }]) => (
              <div key={level} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-indigo-500" size={16} />
                    <h3 className="text-lg font-semibold">
                      Seviye {level}: {
                      ['Absent (Yok)', 'Limited (Sınırlı)', 'Emergent (Ortaya Çıkan)',
                       'Structured (Yapılandırılmış)', 'Integrated (Entegre)', 
                       'User-Driven (Kullanıcı Odaklı)'][level-1]
                    }
                    </h3>
                  </div>
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {completed.toFixed(0)}% Tamamlandı
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.map((task: Task) => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={task.id}
                            checked={task.checked}
                            onCheckedChange={() => handleCheckboxChange(parseInt(level), task.id)}
                        />
                        <label
                            htmlFor={task.id}
                            className="text-sm text-gray-700 cursor-pointer"
                        >
                          {task.text}
                        </label>
                      </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UXMaturityChecklist;
