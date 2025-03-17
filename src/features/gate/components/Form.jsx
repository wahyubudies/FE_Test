import React, { useState, useEffect } from 'react';

const Form = ({ isOpen, onClose, onSave, initialData = null, mode = 'add' }) => {
    const [ruas, setRuas] = useState('');
    const [gerbang, setGerbang] = useState('');
    const [errors, setErrors] = useState({});

    // Determine form title based on mode
    const formTitle = {
        'add': 'Tambah Gerbang',
        'edit': 'Edit Gerbang',
        'view': 'Detail Gerbang'
    }[mode];

    // Initialize form with data when in edit or view mode
    useEffect(() => {
        if (initialData) {
            setRuas(initialData.ruas || '');
            setGerbang(initialData.gerbang || '');
        } else {
            // Reset form when no initial data (for add mode)
            setRuas('');
            setGerbang('');
        }
        // Reset errors when form is opened
        setErrors({});
    }, [initialData, isOpen]);

    const validateForm = () => {
        const newErrors = {};
        if (!ruas.trim()) newErrors.ruas = 'Ruas tidak boleh kosong';
        if (!gerbang.trim()) newErrors.gerbang = 'Gerbang tidak boleh kosong';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (mode === 'view') {
            onClose();
            return;
        }

        if (validateForm()) {
            onSave({
                ...(initialData?.id && { id: initialData.id }),
                ruas,
                gerbang
            });
            setRuas('');
            setGerbang('');
            onClose();
        }
    };

    if (!isOpen) return null;

    const isReadOnly = mode === 'view';

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-center">{formTitle}</h2>
                <div className="flex gap-3">
                    {/* Input Ruas */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                            Ruas{!isReadOnly && '*'}
                        </label>
                        <input
                            type="text"
                            value={ruas}
                            onChange={(e) => setRuas(e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${
                                isReadOnly
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:outline-none focus:ring-2 focus:ring-blue-400'
                            } ${errors.ruas ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Masukkan Ruas"
                            readOnly={isReadOnly}
                        />
                        {errors.ruas && (
                            <p className="text-red-500 text-xs mt-1">{errors.ruas}</p>
                        )}
                    </div>

                    {/* Input Gerbang */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">
                            Gerbang{!isReadOnly && '*'}
                        </label>
                        <input
                            type="text"
                            value={gerbang}
                            onChange={(e) => setGerbang(e.target.value)}
                            className={`w-full border rounded px-3 py-2 ${
                                isReadOnly
                                    ? 'bg-gray-100 cursor-not-allowed'
                                    : 'focus:outline-none focus:ring-2 focus:ring-blue-400'
                            } ${errors.gerbang ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Masukkan Gerbang"
                            readOnly={isReadOnly}
                        />
                        {errors.gerbang && (
                            <p className="text-red-500 text-xs mt-1">{errors.gerbang}</p>
                        )}
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100">
                        {isReadOnly ? 'Tutup' : 'Batal'}
                    </button>
                    {!isReadOnly && (
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Simpan
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Form;