import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function DocsPageID() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow p-4 sm:p-8 relative overflow-hidden">
                {/* Abstract Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/30 rounded-full mb-4">
                            <span className="material-symbols-outlined text-amber-400">waving_hand</span>
                            <span className="text-amber-400 font-medium">Khusus untuk Shandi</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                            Panduan Penggunaan
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Cara setup dan menggunakan Dashboard Suhu IoT - dijelaskan dengan bahasa yang mudah dipahami 🚀
                        </p>
                    </div>

                    {/* Content Cards */}
                    <div className="space-y-8">
                        {/* Aplikasi ini apa? */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-primary">info</span>
                                <h2 className="text-2xl font-bold text-white">Ini Aplikasi Apa?</h2>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    <strong className="text-white">Dashboard Suhu IoT</strong> adalah website untuk menampilkan
                                    data suhu dari termometer kamu secara <strong className="text-primary">real-time</strong> (langsung update tanpa perlu refresh halaman).
                                </p>
                                <p>
                                    Jadi alurnya begini:
                                </p>
                                <div className="p-4 bg-slate-800/50 rounded-xl space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                        <p>🌡️ <strong>Termometer</strong> membaca suhu</p>
                                    </div>
                                    <div className="flex items-center gap-3 pl-4">
                                        <span className="material-symbols-outlined text-slate-500">arrow_downward</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                        <p>📡 Data dikirim ke <strong>Node-RED</strong></p>
                                    </div>
                                    <div className="flex items-center gap-3 pl-4">
                                        <span className="material-symbols-outlined text-slate-500">arrow_downward</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-sm">3</div>
                                        <p>🌐 <strong>Website ini</strong> mengambil data dari Node-RED dan menampilkan grafiknya</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Apa yang harus dilakukan di Node-RED */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-amber-400">construction</span>
                                <h2 className="text-2xl font-bold text-white">Yang Harus Kamu Siapkan di Node-RED</h2>
                            </div>
                            <div className="space-y-4 text-slate-300">
                                <p>
                                    Sebelum website ini bisa menampilkan suhu, Node-RED kamu harus mengirimkan data dalam format yang benar.
                                </p>

                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-400">close</span>
                                        <div>
                                            <p className="font-semibold text-red-400 mb-2">❌ Format yang SALAH (ini tidak akan bekerja):</p>
                                            <pre className="bg-[#15151e] p-3 rounded-lg text-sm overflow-x-auto">
                                                {`{ "message": "rest api sudah jalan", "waktu": "..." }`}
                                            </pre>
                                            <p className="text-sm mt-2 text-slate-400">
                                                Ini tidak ada data suhunya! Website tidak tahu harus menampilkan apa.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                                        <div>
                                            <p className="font-semibold text-emerald-400 mb-2">✅ Format yang BENAR:</p>
                                            <pre className="bg-[#15151e] p-3 rounded-lg text-sm overflow-x-auto">
                                                {`{
  "temperature": 28.5,
  "message": "berhasil",
  "waktu": "2026-02-05"
}`}
                                            </pre>
                                            <p className="text-sm mt-2 text-slate-400">
                                                Harus ada field <code className="bg-slate-700 px-2 py-0.5 rounded">temperature</code> yang isinya angka!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-primary/10 border border-primary/30 rounded-xl">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                                        <div>
                                            <p className="font-semibold text-primary mb-2">💡 Tips:</p>
                                            <p className="text-sm">
                                                Kalau tidak bisa pakai <code className="bg-slate-700 px-2 py-0.5 rounded">temperature</code>,
                                                nama lain yang bisa dipakai:
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {['temp', 'suhu', 'value', 'data', 'reading'].map(name => (
                                                    <span key={name} className="bg-slate-700 px-3 py-1 rounded-full text-sm">{name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Cara Menggunakan Website Ini */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-cyan-400">play_circle</span>
                                <h2 className="text-2xl font-bold text-white">Cara Menggunakan Website Ini</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        step: 1,
                                        title: 'Masukkan Alamat API',
                                        desc: 'Di halaman Setup, masukkan alamat Node-RED kamu. Contohnya: http://192.168.1.100:1880/suhu',
                                        icon: 'link'
                                    },
                                    {
                                        step: 2,
                                        title: 'Pilih Method GET',
                                        desc: 'Biasanya pakai GET. Kalau tidak yakin, tanya dulu atau coba-coba saja.',
                                        icon: 'http'
                                    },
                                    {
                                        step: 3,
                                        title: 'Atur Refresh Rate',
                                        desc: 'Ini seberapa cepat data diambil. 2000 artinya setiap 2 detik. Kalau mau lebih lambat, pakai 5000 (5 detik).',
                                        icon: 'timer'
                                    },
                                    {
                                        step: 4,
                                        title: 'Klik "Connect & Test"',
                                        desc: 'Kalau berhasil, akan muncul pesan hijau. Kalau gagal, akan muncul pesan merah di kotak log bawah.',
                                        icon: 'settings_ethernet'
                                    },
                                    {
                                        step: 5,
                                        title: 'Lihat Grafik Suhu!',
                                        desc: 'Kalau koneksi berhasil, kamu akan dibawa ke halaman Dashboard dengan grafik suhu yang update otomatis.',
                                        icon: 'show_chart'
                                    },
                                ].map((item) => (
                                    <div key={item.step} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white flex items-center gap-2">
                                                <span className="text-primary">Langkah {item.step}:</span> {item.title}
                                            </h3>
                                            <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Kalau Ada Error */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-red-400">error</span>
                                <h2 className="text-2xl font-bold text-white">Kalau Ada Error</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="text-red-400">🔴</span> "Network Error" atau CORS Error
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-2">
                                        <strong className="text-white">Artinya:</strong> Website tidak bisa terhubung ke Node-RED.
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        <strong className="text-emerald-400">Solusi:</strong> Pastikan komputer yang menjalankan Node-RED menyala,
                                        dan pastikan alamat IP-nya benar. Coba akses alamat API langsung di browser untuk test.
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="text-red-400">🔴</span> "Unable to find temperature value"
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-2">
                                        <strong className="text-white">Artinya:</strong> Website berhasil konek, tapi data yang dikirim tidak ada suhunya.
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        <strong className="text-emerald-400">Solusi:</strong> Ubah Node-RED kamu supaya mengirim data dengan format yang benar
                                        (lihat bagian di atas). Pastikan ada field <code className="bg-slate-700 px-2 py-0.5 rounded">temperature</code>
                                        atau <code className="bg-slate-700 px-2 py-0.5 rounded">suhu</code>.
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-800/30 rounded-xl">
                                    <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                                        <span className="text-red-400">🔴</span> Grafik tidak bergerak / datar saja
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-2">
                                        <strong className="text-white">Artinya:</strong> Suhu tidak berubah atau monitoring tidak aktif.
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        <strong className="text-emerald-400">Solusi:</strong> Cek apakah tombol monitoring di atas sudah aktif (hijau).
                                        Kalau suhunya memang tidak berubah, grafiknya memang akan datar.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Glossary */}
                        <section className="bg-white/5 dark:bg-[#1c1c27]/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-2xl text-purple-400">book</span>
                                <h2 className="text-2xl font-bold text-white">Istilah-istilah Penting</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { term: 'API', meaning: 'Cara komputer/website berkomunikasi satu sama lain lewat internet' },
                                    { term: 'Endpoint URL', meaning: 'Alamat lengkap API-nya, seperti alamat rumah' },
                                    { term: 'GET', meaning: 'Cara meminta data (seperti bertanya "suhu berapa sekarang?")' },
                                    { term: 'POST', meaning: 'Cara mengirim data (seperti bilang "ini data suhunya")' },
                                    { term: 'JSON', meaning: 'Format data yang dipakai (seperti kamus dengan key dan value)' },
                                    { term: 'Refresh Rate', meaning: 'Seberapa sering website mengambil data baru' },
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3 bg-slate-800/30 rounded-xl">
                                        <h3 className="font-bold text-primary">{item.term}</h3>
                                        <p className="text-sm text-slate-400">{item.meaning}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Back to Setup CTA */}
                    <div className="text-center mt-12 space-x-4">
                        <Link
                            to="/docs"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
                        >
                            <span className="material-symbols-outlined">translate</span>
                            English Version
                        </Link>
                        <Link
                            to="/setup"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-[1.02]"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                            Kembali ke Setup
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
